# Configuración de Stripe para Pagos

## Paso 1: Crear cuenta de Stripe

1. Ve a https://dashboard.stripe.com/register
2. Regístrate o inicia sesión
3. Verifica tu email

## Paso 2: Crear Producto y Precio

1. En el dashboard, ve a **Products** → **Add product**
2. Nombre: `Pro Plan`
3. Descripción: `Unlimited meta tag previews`
4. Precio: `$9` por `month`
5. Copia el **Price ID** (parecido a `price_1234567890...`)

## Paso 3: Obtener Claves API

1. Ve a **Developers** → **API keys**
2. Copia tu **Secret key** (empieza con `sk_test_...` para modo test)
3. Guarda estas claves:

```
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_clave_aqui
STRIPE_PRICE_ID=price_tu_id_aqui
```

## Paso 4: Configurar Webhook

1. Ve a **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://tu-dominio.vercel.app/api/webhook/stripe`
3. Selecciona eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copia el **Signing Secret** (empieza con `whsec_...`)

## Paso 5: Configurar Variables en Vercel

Usa el CLI o ve al dashboard de Vercel:

```bash
# Via CLI
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add STRIPE_PRICE_ID production
vercel env add NEXT_PUBLIC_BASE_URL production
```

O desde https://vercel.com/flaviogrillo1s-projects/metatags-preview/settings/environment-variables

## Paso 6: Probar en Modo Test

1. Usa la tarjeta de test: `4242 4242 4242 4242`
2. Cualquier fecha futura
3. Cualualier CVC (3 dígitos)
4. Verifica el webhook recibe los eventos

## Paso 7: Pasar a Producción

1. Repite pasos 2-4 con claves de producción (`sk_live_...`)
2. Actualiza las variables en Vercel
3. Verifica el webhook con URL de producción

---

## Flujo del Usuario

### Cliente Free → Pro

1. Usuario hace clic en "Upgrade Now"
2. Redirigido a Stripe Checkout
3. Ingresa datos de pago
4. Stripe llama webhook `checkout.session.completed`
5. Tu app actualiza `isPro = true`
6. Usuario redirigido de vuelta con `?success=true`

### Gestión de Suscripción

1. Usuario accede a customer portal
2. Puede cancelar, actualizar método de pago
3. Stripe llama webhooks correspondientes
4. Tu app actualiza estado `isPro`

---

## Problema Actual: Sin Base de Datos

**El código actual no tiene persistencia real.** Los webhooks de Stripe llegan pero no guardan el estado de suscripción en ningún lado.

### Soluciones:

#### Opción 1: Base de Datos (Recomendado)
- **Supabase** (gratuito hasta 500MB)
- **Vercel Postgres** ($20/mes)
- **PlanetScale** (gratuito para desarrollo)

#### Opción 2: Stripe Customer ID en LocalStorage (Temporal)
- Guardar `stripeCustomerId` en localStorage
- Leer al cargar la página
- Verificar suscripción via API de Stripe
- **Problema:** Solo funciona en un navegador, no se sincroniza entre dispositivos

#### Opción 3: Email + Magic Link (Simple)
- Usuario introduce email
- Enviar magic link por email
- Verificar suscripción via API de Stripe
- Guardar `isPro` en localStorage

---

## ¿Qué Siguiente?

Paso a paso:

1. **Configurar Stripe** (15 min)
2. **Elegir solución de base de datos** (30 min)
3. **Implementar persistencia** (2-3 horas)
4. **Testing completo** (1 hora)

¿Quieres que te ayude con alguno de estos pasos?
