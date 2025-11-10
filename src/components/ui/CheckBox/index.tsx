'use client';

import { PropsWithChildren } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import colors from '@/theme/colors';

import Icon from '../Icon';

const CheckBox = <TFieldValues extends FieldValues>({
  children,
  name,
  control,
}: PropsWithChildren<UseControllerProps<TFieldValues>>) => {
  const { field } = useController({
    control,
    name,
  });

  const onClick = () => {
    field.onChange(!field.value);
  };

  return (
    <label className="flex items-center gap-2">
      <button
        className="flex h-6 w-6 items-center justify-center rounded-md"
        style={{
          backgroundColor: field.value ? colors.green[600] : colors.transparent,
          border: field.value ? 'none' : `1px solid ${colors.neutral[200]}`,
        }}
        type="button"
        onClick={onClick}
      >
        {field.value && (
          <Icon
            color={colors.white}
            name="CheckIcon"
            size={12}
            strokeWidth={3}
          />
        )}
      </button>

      {children}
    </label>
  );
};

export default CheckBox;
