import { db } from '@/mocks/seed';
import { NOW } from '@/mocks/lib/rng';
import { respond, error } from '@/mocks/lib/envelope';
import { state, withStore, persist } from '@/mocks/store/store';
import type { Ctx } from './types';

function priceOf(entity: any) {
  return entity.price_with_discount ?? Number(entity.price) ?? 0;
}

function buildCartItem(entity: any, type: 'webinar' | 'bundle') {
  const teacherName = entity.teacher?.full_name || 'FlutterCamp';
  const price = priceOf(entity);
  return {
    id: entity.id,
    type,
    info: {
      id: entity.id,
      imgPath: entity.image,
      itemUrl: entity.link,
      title: entity.title,
      profileUrl: `/user/${entity.teacher?.id || ''}`,
      teacherName,
      teacher_id: entity.teacher?.id || 0,
      rate: entity.rate,
      price: String(price),
      discountPrice: null,
    },
    image: entity.image,
    title: entity.title,
    teacher_name: teacherName,
    rate: entity.rate,
    price: String(price),
    discount: null,
    quantity: null,
  };
}

function amounts() {
  const subTotal = state.cartItems.reduce((s, it) => s + Number(it.price || 0), 0);
  return {
    sub_total: subTotal,
    total_discount: 0,
    tax: '0',
    tax_price: 0,
    commission: 0,
    commission_price: 0,
    total: subTotal,
    product_delivery_fee: 0,
    tax_is_different: false,
  };
}

export function list(_ctx: Ctx) {
  return withStore(() => respond({ cart: { items: state.cartItems, amounts: amounts(), user_group: null } }));
}

export function add(ctx: Ctx) {
  return withStore(() => {
    const itemId = Number(ctx.body?.item_id);
    const itemName = ctx.body?.item_name as 'webinar' | 'bundle' | 'product';
    const entity = itemName === 'bundle' ? db.bundlesById.get(itemId) : db.coursesById.get(itemId);
    if (!entity) return error('Item not found', 404);
    if (state.cartItems.some((it) => it.id === itemId && it.type === itemName)) {
      return error('This item is already in your cart.', 422);
    }
    state.cartItems.push(buildCartItem(entity, itemName === 'bundle' ? 'bundle' : 'webinar'));
    persist();
    return respond({}, 'Added to your cart');
  });
}

export function remove(ctx: Ctx) {
  return withStore(() => {
    const id = Number(ctx.params.id);
    state.cartItems = state.cartItems.filter((it) => it.id !== id);
    persist();
    return respond({}, 'Removed from cart');
  });
}

export function validateCoupon(ctx: Ctx) {
  const coupon = String(ctx.body?.coupon || '').toLowerCase();
  if (coupon.includes('flutter')) {
    return respond({ discount: 10, type: 'percent' }, 'Coupon applied — 10% off!');
  }
  return error('This coupon code is invalid or expired.', 422);
}

export function checkout(_ctx: Ctx) {
  return withStore(() => {
    const amt = amounts();
    const order = {
      user_id: 1001, status: 'pending', amount: amt.sub_total, tax: 0, total_discount: 0,
      total_amount: amt.total, created_at: Math.floor(NOW / 1000), id: 90001,
    };
    return respond({
      paymentChannels: db.config.payment_channels.active,
      carts: [],
      user_group: null,
      order,
      count: state.cartItems.length,
      userCharge: 250,
      razorpay: false,
      amounts: amt,
    });
  });
}

export function storeCart(_ctx: Ctx) {
  return respond({}, 'Saved');
}

export function paymentRequest(_ctx: Ctx) {
  return respond({
    status: true,
    message: 'Redirecting to payment…',
    data: { authorization_url: '/cart/checkout/success', access_code: 'mock', reference: 90001 },
  });
}

export function paymentCredit(ctx: Ctx) {
  return withStore(() => {
    state.cartItems = [];
    persist();
    return respond({}, 'Payment successful');
  });
}

export function paymentVerify(_ctx: Ctx) {
  return respond({ title: 'Payment Successful', msg: 'Your enrollment is confirmed.', status: 'success' });
}
