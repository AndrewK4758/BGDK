import { IRegisterUserClient } from '@bgdk/types-api';
import { FormikProps } from 'formik';
import { ChangeEvent } from 'react';

const updateFormOnChange = async (e: ChangeEvent<HTMLInputElement>, formik: FormikProps<IRegisterUserClient>) => {
  if (e.target.files) {
    await formik.setFieldValue('thumbnail', e.target.files[0]);

    await formik.setFieldTouched('thumbnail');

    await formik.validateField('thumbnail');
  }
};

export default updateFormOnChange;
