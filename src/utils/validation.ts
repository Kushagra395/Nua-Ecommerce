import { z } from 'zod'

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\d{10,}$/, 'Phone must be at least 10 digits'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z
    .string()
    .regex(/^\d{5,}$/, 'Pincode must be numeric and at least 5 digits'),
  country: z.string().min(2, 'Country is required'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

export interface Order {
  id: string
  items: Array<{ id: number; title: string; qty: number; price: number }>
  total: number
  shippingInfo: CheckoutFormData
  createdAt: string
}
