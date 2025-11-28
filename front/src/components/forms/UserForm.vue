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
  (e: 'submit', payload: { name: string; email: string }): void
}>()

const userFormSchema = toTypedSchema(
  z.object({
    userName: z.string().min(2, 'Name must be at least 2 characters.'),
    userEmail: z.string().email('Please provide a valid email address.'),
  }),
)

// Callback appelé PAR vee-validate quand le form est valide
function onSubmit(values: { userName: string; userEmail: string }) {
  emit('submit', {
    name: values.userName,
    email: values.userEmail,
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Create user</CardTitle>
      <CardDescription>
        Send a POST request to the user microservice.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <VeeForm
        v-slot="{ handleSubmit, resetForm }"
        :validation-schema="userFormSchema"
        :initial-values="{ userName: '', userEmail: '' }"
        as="div"
      >
        <!-- IMPORTANT : pas de .prevent ici, c'est handleSubmit qui fait le preventDefault -->
        <form class="space-y-4" @submit="handleSubmit($event, onSubmit)">
          <FieldGroup>
            <VeeField v-slot="{ field, errors }" name="userName">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="user-name">
                  Name
                </FieldLabel>
                <Input
                  id="user-name"
                  v-bind="field"
                  autocomplete="off"
                  placeholder="Jane Doe"
                  :aria-invalid="!!errors.length"
                />
                <FieldError v-if="errors.length" :errors="errors" />
              </Field>
            </VeeField>

            <VeeField v-slot="{ field, errors }" name="userEmail">
              <Field :data-invalid="!!errors.length">
                <FieldLabel for="user-email">
                  Email
                </FieldLabel>
                <Input
                  id="user-email"
                  v-bind="field"
                  type="email"
                  autocomplete="off"
                  placeholder="jane.doe@example.com"
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
              Create user
            </Button>
          </div>
        </form>
      </VeeForm>
    </CardContent>
  </Card>
</template>
