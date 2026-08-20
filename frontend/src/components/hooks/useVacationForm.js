import { useState } from 'react';
import { createVacation } from '@/api/vacationApi';
import { validate } from '@/lib/validate';

const emptyForm = {
  fullName: '',
  startDate: '',
  endDate: '',
  reason: '',
};

export function useVacationForm({ onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      await createVacation({
        fullName: form.fullName.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason.trim(),
      });
      setForm(emptyForm);
      await onCreated?.();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Не удалось создать заявку',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    error,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
