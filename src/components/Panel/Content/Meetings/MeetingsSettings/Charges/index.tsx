'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/lib/confirm';
//= Components
import { Icon } from '@iconify/react';
import LoadingSkeleton from '@/components/UIs/Skeleton';
import Input from "@/components/UIs/Input";
import Switch from '@/components/UIs/Switch';
//= Api
import { updateMeetingSettings } from '@/api';
//= Custom Hooks
import { useCompoundState } from '@/hooks';
//= Types
import type { Dictionary, Locale, GetMeetingSettingsResponse } from '@/types';
//= Styles
import cls from './charges.module.scss';

type Props = {
  translations: Dictionary['panel']['meetings']['settings']['charges'];
  meetingsData: GetMeetingSettingsResponse['meeting'] | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

interface Fields {
  amount: number;
  discount: number;
  in_person: boolean;
  group_meeting: boolean;
  in_person_amount: number;
  online_group_min_student: number;
  online_group_max_student: number;
  online_group_amount: number;
  in_person_group_min_student: number;
  in_person_group_max_student: number;
  in_person_group_amount: number;
}

function Charges({ translations, meetingsData, isLoading, refetch }: Props) {
  const [data, dispatch] = useCompoundState<Fields>({
    amount: 0,
    discount: 0,
    in_person: false,
    group_meeting: false,
    in_person_amount: 0,
    online_group_min_student: 0,
    online_group_max_student: 0,
    online_group_amount: 0,
    in_person_group_min_student: 0,
    in_person_group_max_student: 0,
    in_person_group_amount: 0
  });

  useEffect(() => {
    if (meetingsData) {
      dispatch({
        amount: +meetingsData.amount || 0,
        discount: Number(meetingsData.discount || 0),
        in_person: meetingsData.in_person === '1',
        group_meeting: meetingsData.group_meeting === '1',
        in_person_amount: +meetingsData.in_person_amount || 0,
        online_group_min_student: +meetingsData.online_group_min_student || 0,
        online_group_max_student: +meetingsData.online_group_max_student || 0,
        online_group_amount: +meetingsData.online_group_amount || 0,
        in_person_group_min_student: +meetingsData.in_person_group_min_student || 0,
        in_person_group_max_student: +meetingsData.in_person_group_max_student || 0,
        in_person_group_amount: +meetingsData.in_person_group_amount || 0
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingsData]);

  async function save(event: React.MouseEvent<HTMLButtonElement>) {
    const btn = event.currentTarget;
    event.preventDefault();
    btn.classList.add('loading-btn');

    const response = await updateMeetingSettings(meetingsData?.id || 0, {
      amount: data.amount.toString(),
      in_person_amount: data.in_person_amount.toString(),
      online_group_min_student: data.online_group_min_student.toString(),
      online_group_max_student: data.online_group_max_student.toString(),
      online_group_amount: data.online_group_amount.toString(),
      in_person_group_min_student: data.in_person_group_min_student.toString(),
      in_person_group_max_student: data.in_person_group_max_student.toString(),
      in_person_group_amount: data.in_person_group_amount.toString(),
      in_person: data.in_person ? 'on' : 'off',
      group_meeting: data.group_meeting ? 'on' : 'off',
      discount: data.discount.toString()
    });

    if (response) {
      toast.success(translations.saved);
      await refetch();
    }

    btn.classList.remove('loading-btn');
  }

  return (
    <div className={cls.container}>
      <h4 className={cls.title}><Icon icon='fa6-solid:money-bills' /> {translations.title}</h4>
      {
        isLoading ?
          <LoadingSkeleton width="100%" height="500px" rounded />
          :
          <form>
            <div className={cls.field}>
              <Input
                type="number"
                label={translations.amount}
                name="amount"
                placeholder={translations.amount}
                value={data.amount.toString()}
                onChange={(e) => dispatch({ amount: e.target.valueAsNumber })}
              />
            </div>
            <div className={cls.field}>
              <Input
                type="number"
                label={translations.discountRate}
                name="amount"
                placeholder={translations.discountRate}
                value={data.discount.toString()}
                onChange={(e) => dispatch({ discount: e.target.valueAsNumber })}
              />
            </div>
            <div className={cls.formGroup}>
              <p className={cls.input_title}>{translations.inPersonMeetings}</p>
              <div className={cls.input}>
                <label>{translations.inPersonMeetingsMessage}</label>
                <Switch name="in_person" switched={data.in_person} setSwitched={(e) => dispatch({ in_person: e.target.checked })} dark={true} />
              </div>
              {
                data.in_person &&
                <div className={cls.field}>
                  <Input
                    type="number"
                    label={translations.hourlyPrice}
                    name="in_person_amount"
                    placeholder={translations.hourlyPrice}
                    value={data.in_person_amount.toString()}
                    onChange={(e) => dispatch({ in_person_amount: e.target.valueAsNumber })}
                  />
                </div>
              }
            </div>
            <div className={cls.formGroup}>
              <p className={cls.input_title}>{translations.groupMeetings}</p>
              <div className={cls.input}>
                <label>{translations.groupMeetingsMessage}</label>
                <Switch name="group_meeting" switched={data.group_meeting} setSwitched={(e) => dispatch({ group_meeting: e.target.checked })} dark={true} />
              </div>
              {
                data.group_meeting &&
                <>
                  <div className={cls.formGroupArea}>
                    <p className={cls.area_title}>{translations.onlineGroupMeetingOptions}</p>
                    <div className={cls.splitter}></div>
                    <div className={cls.field}>
                      <Input
                        type="number"
                        label={translations.minimumStudents}
                        name="online_group_min_student"
                        placeholder={translations.minimumStudents}
                        value={data.online_group_min_student.toString()}
                        onChange={(e) => dispatch({ online_group_min_student: e.target.valueAsNumber })}
                      />
                    </div>
                    <div className={cls.field}>
                      <Input
                        type="number"
                        label={translations.maximumStudents}
                        name="online_group_max_student"
                        placeholder={translations.maximumStudents}
                        value={data.online_group_max_student.toString()}
                        onChange={(e) => dispatch({ online_group_max_student: e.target.valueAsNumber })}
                      />
                    </div>
                    <div className={cls.field}>
                      <Input
                        type="number"
                        label={translations.hourlyPrice}
                        name="online_group_amount"
                        placeholder={translations.hourlyPrice}
                        value={data.online_group_amount.toString()}
                        onChange={(e) => dispatch({ online_group_amount: e.target.valueAsNumber })}
                      />
                    </div>
                  </div>
                  {
                    data.in_person &&
                    <div className={cls.formGroupArea}>
                      <p className={cls.area_title}>{translations.inPersonGroupMeetingOptions}</p>
                      <div className={cls.splitter}></div>
                      <div className={cls.field}>
                        <Input
                          type="number"
                          label={translations.minimumStudents}
                          name="in_person_group_min_student"
                          placeholder={translations.minimumStudents}
                          value={data.in_person_group_min_student.toString()}
                          onChange={(e) => dispatch({ in_person_group_min_student: e.target.valueAsNumber })}
                        />
                      </div>
                      <div className={cls.field}>
                        <Input
                          type="number"
                          label={translations.maximumStudents}
                          name="in_person_group_max_student"
                          placeholder={translations.maximumStudents}
                          value={data.in_person_group_max_student.toString()}
                          onChange={(e) => dispatch({ in_person_group_max_student: e.target.valueAsNumber })}
                        />
                      </div>
                      <div className={cls.field}>
                        <Input
                          type="number"
                          label={translations.hourlyPrice}
                          name="in_person_group_amount"
                          placeholder={translations.hourlyPrice}
                          value={data.in_person_group_amount.toString()}
                          onChange={(e) => dispatch({ in_person_group_amount: e.target.valueAsNumber })}
                        />
                      </div>
                    </div>
                  }
                </>
              }
            </div>
            <div className={cls.actions}>
              <button onClick={save}>{translations.save}</button>
            </div>
          </form>
      }
    </div>
  )
}

export default Charges;