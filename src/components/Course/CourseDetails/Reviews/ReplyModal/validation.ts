import { z } from 'zod';
import toast from 'react-hot-toast';

const replySchema = z.object({
  reply: z.string().min(10, "Reply content must be at least 10 characters"),
});

export function validateReply(data: any) {
  const validation = replySchema.safeParse(data);
  if (!validation.success) {
    validation.error.issues.forEach((issue: any) => toast.error(`${issue.path.join('.')}: ${issue.message}`));
    return false;
  }
  return true;
}