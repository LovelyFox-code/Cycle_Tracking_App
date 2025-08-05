# API Validation with Zod

This project uses [Zod](https://github.com/colinhacks/zod) for request validation in the API. Zod provides a type-safe, schema-based validation system that integrates well with TypeScript.

## How Validation Works

1. **Schema Definition**: Each API endpoint has a corresponding schema defined in the `schema` directory.
2. **Middleware**: The `validateResource` middleware validates incoming requests against these schemas.
3. **Type Safety**: Types are automatically inferred from schemas, ensuring consistency between validation and usage.

## Adding Validation to a New Endpoint

1. Create a schema in the appropriate schema file:

```typescript
// Example schema for a new endpoint
export const myNewEndpointSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.number().min(18, "Must be at least 18 years old")
  }),
  params: z.object({
    id: z.string().uuid("Invalid ID format")
  }),
  query: z.object({
    limit: z.string().transform(Number).optional()
  })
});
```

2. Apply the validation middleware to your route:

```typescript
router.post('/my-endpoint/:id', validateResource(myNewEndpointSchema), myEndpointHandler);
```

3. Use the inferred types in your handler:

```typescript
// Get TypeScript type from the schema
export type MyEndpointInput = z.infer<typeof myNewEndpointSchema>['body'];

// Use in your handler
function myEndpointHandler(req: Request, res: Response) {
  const data: MyEndpointInput = req.body;
  // data is now fully typed according to the schema
}
```

## Error Handling

When validation fails, the middleware returns a 400 Bad Request response with detailed error information:

```json
{
  "errors": [
    {
      "field": "body.name",
      "message": "Name must be at least 2 characters"
    },
    {
      "field": "params.id",
      "message": "Invalid ID format"
    }
  ]
}
```

## Best Practices

1. **Reuse Schema Components**: Define common validation logic that can be reused across schemas.
2. **Keep Schemas Close to Models**: Align your validation schemas with your data models.
3. **Validate Everything**: Apply validation to all endpoints that accept user input.
4. **Use Transformations**: Zod can transform data during validation (e.g., string to number).