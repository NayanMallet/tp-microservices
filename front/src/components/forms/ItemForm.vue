<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const emit = defineEmits<{
  (e: 'submit', payload: { name: string }): void
}>()

const itemFormSchema = toTypedSchema(
  z.object({
    itemName: z.string().min(2, 'Item name must be at least 2 characters.'),
  }),
)

function onSubmit(values: { itemName: string }) {
  emit('submit', {
    name: values.itemName,
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Create item</CardTitle>
      <CardDescription>
        Send a POST request to the item microservice.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <VeeForm
        v-slot="{ handleSubmit, resetForm }"
        :validation-schema="itemFormSchema"
        :initial-values="{ itemName: '' }"
        as="div"
      >
        <form class="space-y-4" @submit="handleSubmit($event, onSubmit)">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="itemName">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="item-name">
                  Item name
                </FieldLabel>
                <Input
                  id="item-name"
                  v-bind="field"
                  autocomplete="off"
                  placeholder="Magic sword"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>

          <div class="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              @click="resetForm()"
            >
              Reset
            </Button>
            <Button type="submit">
              Create item
            </Button>
          </div>
        </form>
      </VeeForm>
    </CardContent>
  </Card>
</template>
