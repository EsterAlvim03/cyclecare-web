'use client';

import type { JSX } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { ReactMaskProps } from 'react-imask';

type Props<TFieldValues extends FieldValues> = {
  label: string;
  options: { value: string; label: string }[];
} & UseControllerProps<TFieldValues> &
  JSX.IntrinsicElements['select'] &
  ReactMaskProps<HTMLInputElement>;

const Dropdown = <TFieldValues extends FieldValues>({
  label,
  control,
  name,
  options,
  ...props
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
      )}

      <div>
        <select
          className="w-full rounded-lg border border-neutral-200 bg-white p-2 text-lg text-neutral-600 outline-none"
          id={name}
          value={field.value || ''}
          onChange={field.onChange}
          {...props}
        >
          <option disabled value="">
            Selecione uma opção
          </option>

          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error?.message && (
          <span className="text-xs text-red-500">{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
