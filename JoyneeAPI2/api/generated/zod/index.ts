import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const HashtagScalarFieldEnumSchema = z.enum(['id','text']);

export const AccountScalarFieldEnumSchema = z.enum(['id','name','active','createdAt','updatedAt']);

export const UserPlaceholderScalarFieldEnumSchema = z.enum(['id','name','emailPattern','hashtagSuggestions']);

export const UserScalarFieldEnumSchema = z.enum(['id','authId','firstName','lastName','birthDate','avatar','email','active','createdAt','updatedAt','personality','bio']);

export const UserHashtagScalarFieldEnumSchema = z.enum(['userId','hashtagId','relevance']);

export const UserSettingsScalarFieldEnumSchema = z.enum(['id','key','value','userId']);

export const UserPhotoScalarFieldEnumSchema = z.enum(['id','url','caption','userId']);

export const BubbleScalarFieldEnumSchema = z.enum(['id','name','lang','type','active','createdAt','updatedAt']);

export const BubbleHashtagScalarFieldEnumSchema = z.enum(['bubbleId','hashtagId']);

export const UserBubbleSubscriptionScalarFieldEnumSchema = z.enum(['id','bubbleId','userId','createdAt','updatedAt','active','acceptMatches','weight']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const BubbleLangSchema = z.enum(['en','cs']);

export type BubbleLangType = `${z.infer<typeof BubbleLangSchema>}`

export const BubbleTypeSchema = z.enum(['timeBased','locationBased','eventBased','interestBased']);

export type BubbleTypeType = `${z.infer<typeof BubbleTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// HASHTAG SCHEMA
/////////////////////////////////////////

export const HashtagSchema = z.object({
  id: z.number().int(),
  text: z.string(),
})

export type Hashtag = z.infer<typeof HashtagSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// USER PLACEHOLDER SCHEMA
/////////////////////////////////////////

export const UserPlaceholderSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  emailPattern: z.string(),
  hashtagSuggestions: z.string().nullable(),
})

export type UserPlaceholder = z.infer<typeof UserPlaceholderSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).nullable(),
  avatar: z.string().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  personality: z.string(),
  bio: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER HASHTAG SCHEMA
/////////////////////////////////////////

export const UserHashtagSchema = z.object({
  userId: z.number().int(),
  hashtagId: z.number().int(),
  relevance: z.number(),
})

export type UserHashtag = z.infer<typeof UserHashtagSchema>

/////////////////////////////////////////
// USER SETTINGS SCHEMA
/////////////////////////////////////////

export const UserSettingsSchema = z.object({
  id: z.number().int(),
  key: z.string(),
  value: z.string(),
  userId: z.number().int(),
})

export type UserSettings = z.infer<typeof UserSettingsSchema>

/////////////////////////////////////////
// USER PHOTO SCHEMA
/////////////////////////////////////////

export const UserPhotoSchema = z.object({
  id: z.number().int(),
  url: z.string(),
  caption: z.string(),
  userId: z.number().int(),
})

export type UserPhoto = z.infer<typeof UserPhotoSchema>

/////////////////////////////////////////
// BUBBLE SCHEMA
/////////////////////////////////////////

export const BubbleSchema = z.object({
  lang: BubbleLangSchema,
  id: z.number().int(),
  name: z.string(),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Bubble = z.infer<typeof BubbleSchema>

/////////////////////////////////////////
// BUBBLE HASHTAG SCHEMA
/////////////////////////////////////////

export const BubbleHashtagSchema = z.object({
  bubbleId: z.number().int(),
  hashtagId: z.number().int(),
})

export type BubbleHashtag = z.infer<typeof BubbleHashtagSchema>

/////////////////////////////////////////
// USER BUBBLE SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const UserBubbleSubscriptionSchema = z.object({
  id: z.number().int(),
  bubbleId: z.number().int(),
  userId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number(),
})

export type UserBubbleSubscription = z.infer<typeof UserBubbleSubscriptionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// HASHTAG
//------------------------------------------------------

export const HashtagIncludeSchema: z.ZodType<Prisma.HashtagInclude> = z.object({
  eventHashtags: z.union([z.boolean(),z.lazy(() => BubbleHashtagFindManyArgsSchema)]).optional(),
  userHashtags: z.union([z.boolean(),z.lazy(() => UserHashtagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HashtagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HashtagArgsSchema: z.ZodType<Prisma.HashtagDefaultArgs> = z.object({
  select: z.lazy(() => HashtagSelectSchema).optional(),
  include: z.lazy(() => HashtagIncludeSchema).optional(),
}).strict();

export const HashtagCountOutputTypeArgsSchema: z.ZodType<Prisma.HashtagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => HashtagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HashtagCountOutputTypeSelectSchema: z.ZodType<Prisma.HashtagCountOutputTypeSelect> = z.object({
  eventHashtags: z.boolean().optional(),
  userHashtags: z.boolean().optional(),
}).strict();

export const HashtagSelectSchema: z.ZodType<Prisma.HashtagSelect> = z.object({
  id: z.boolean().optional(),
  text: z.boolean().optional(),
  eventHashtags: z.union([z.boolean(),z.lazy(() => BubbleHashtagFindManyArgsSchema)]).optional(),
  userHashtags: z.union([z.boolean(),z.lazy(() => UserHashtagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HashtagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  active: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// USER PLACEHOLDER
//------------------------------------------------------

export const UserPlaceholderSelectSchema: z.ZodType<Prisma.UserPlaceholderSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  emailPattern: z.boolean().optional(),
  hashtagSuggestions: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  hashtags: z.union([z.boolean(),z.lazy(() => UserHashtagFindManyArgsSchema)]).optional(),
  photos: z.union([z.boolean(),z.lazy(() => UserPhotoFindManyArgsSchema)]).optional(),
  settings: z.union([z.boolean(),z.lazy(() => UserSettingsFindManyArgsSchema)]).optional(),
  bubbleSubscriptions: z.union([z.boolean(),z.lazy(() => UserBubbleSubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  hashtags: z.boolean().optional(),
  photos: z.boolean().optional(),
  settings: z.boolean().optional(),
  bubbleSubscriptions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  authId: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  birthDate: z.boolean().optional(),
  avatar: z.boolean().optional(),
  email: z.boolean().optional(),
  active: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  personality: z.boolean().optional(),
  bio: z.boolean().optional(),
  hashtags: z.union([z.boolean(),z.lazy(() => UserHashtagFindManyArgsSchema)]).optional(),
  photos: z.union([z.boolean(),z.lazy(() => UserPhotoFindManyArgsSchema)]).optional(),
  settings: z.union([z.boolean(),z.lazy(() => UserSettingsFindManyArgsSchema)]).optional(),
  bubbleSubscriptions: z.union([z.boolean(),z.lazy(() => UserBubbleSubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER HASHTAG
//------------------------------------------------------

export const UserHashtagIncludeSchema: z.ZodType<Prisma.UserHashtagInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  hashtag: z.union([z.boolean(),z.lazy(() => HashtagArgsSchema)]).optional(),
}).strict()

export const UserHashtagArgsSchema: z.ZodType<Prisma.UserHashtagDefaultArgs> = z.object({
  select: z.lazy(() => UserHashtagSelectSchema).optional(),
  include: z.lazy(() => UserHashtagIncludeSchema).optional(),
}).strict();

export const UserHashtagSelectSchema: z.ZodType<Prisma.UserHashtagSelect> = z.object({
  userId: z.boolean().optional(),
  hashtagId: z.boolean().optional(),
  relevance: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  hashtag: z.union([z.boolean(),z.lazy(() => HashtagArgsSchema)]).optional(),
}).strict()

// USER SETTINGS
//------------------------------------------------------

export const UserSettingsIncludeSchema: z.ZodType<Prisma.UserSettingsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserSettingsArgsSchema: z.ZodType<Prisma.UserSettingsDefaultArgs> = z.object({
  select: z.lazy(() => UserSettingsSelectSchema).optional(),
  include: z.lazy(() => UserSettingsIncludeSchema).optional(),
}).strict();

export const UserSettingsSelectSchema: z.ZodType<Prisma.UserSettingsSelect> = z.object({
  id: z.boolean().optional(),
  key: z.boolean().optional(),
  value: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER PHOTO
//------------------------------------------------------

export const UserPhotoIncludeSchema: z.ZodType<Prisma.UserPhotoInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserPhotoArgsSchema: z.ZodType<Prisma.UserPhotoDefaultArgs> = z.object({
  select: z.lazy(() => UserPhotoSelectSchema).optional(),
  include: z.lazy(() => UserPhotoIncludeSchema).optional(),
}).strict();

export const UserPhotoSelectSchema: z.ZodType<Prisma.UserPhotoSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  caption: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// BUBBLE
//------------------------------------------------------

export const BubbleIncludeSchema: z.ZodType<Prisma.BubbleInclude> = z.object({
  hashtags: z.union([z.boolean(),z.lazy(() => BubbleHashtagFindManyArgsSchema)]).optional(),
  userSubscriptions: z.union([z.boolean(),z.lazy(() => UserBubbleSubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BubbleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BubbleArgsSchema: z.ZodType<Prisma.BubbleDefaultArgs> = z.object({
  select: z.lazy(() => BubbleSelectSchema).optional(),
  include: z.lazy(() => BubbleIncludeSchema).optional(),
}).strict();

export const BubbleCountOutputTypeArgsSchema: z.ZodType<Prisma.BubbleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BubbleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BubbleCountOutputTypeSelectSchema: z.ZodType<Prisma.BubbleCountOutputTypeSelect> = z.object({
  hashtags: z.boolean().optional(),
  userSubscriptions: z.boolean().optional(),
}).strict();

export const BubbleSelectSchema: z.ZodType<Prisma.BubbleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  lang: z.boolean().optional(),
  type: z.boolean().optional(),
  active: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  hashtags: z.union([z.boolean(),z.lazy(() => BubbleHashtagFindManyArgsSchema)]).optional(),
  userSubscriptions: z.union([z.boolean(),z.lazy(() => UserBubbleSubscriptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BubbleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BUBBLE HASHTAG
//------------------------------------------------------

export const BubbleHashtagIncludeSchema: z.ZodType<Prisma.BubbleHashtagInclude> = z.object({
  bubble: z.union([z.boolean(),z.lazy(() => BubbleArgsSchema)]).optional(),
  hashtag: z.union([z.boolean(),z.lazy(() => HashtagArgsSchema)]).optional(),
}).strict()

export const BubbleHashtagArgsSchema: z.ZodType<Prisma.BubbleHashtagDefaultArgs> = z.object({
  select: z.lazy(() => BubbleHashtagSelectSchema).optional(),
  include: z.lazy(() => BubbleHashtagIncludeSchema).optional(),
}).strict();

export const BubbleHashtagSelectSchema: z.ZodType<Prisma.BubbleHashtagSelect> = z.object({
  bubbleId: z.boolean().optional(),
  hashtagId: z.boolean().optional(),
  bubble: z.union([z.boolean(),z.lazy(() => BubbleArgsSchema)]).optional(),
  hashtag: z.union([z.boolean(),z.lazy(() => HashtagArgsSchema)]).optional(),
}).strict()

// USER BUBBLE SUBSCRIPTION
//------------------------------------------------------

export const UserBubbleSubscriptionIncludeSchema: z.ZodType<Prisma.UserBubbleSubscriptionInclude> = z.object({
  bubble: z.union([z.boolean(),z.lazy(() => BubbleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserBubbleSubscriptionArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionDefaultArgs> = z.object({
  select: z.lazy(() => UserBubbleSubscriptionSelectSchema).optional(),
  include: z.lazy(() => UserBubbleSubscriptionIncludeSchema).optional(),
}).strict();

export const UserBubbleSubscriptionSelectSchema: z.ZodType<Prisma.UserBubbleSubscriptionSelect> = z.object({
  id: z.boolean().optional(),
  bubbleId: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  active: z.boolean().optional(),
  acceptMatches: z.boolean().optional(),
  weight: z.boolean().optional(),
  bubble: z.union([z.boolean(),z.lazy(() => BubbleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const HashtagWhereInputSchema: z.ZodType<Prisma.HashtagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HashtagWhereInputSchema),z.lazy(() => HashtagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HashtagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HashtagWhereInputSchema),z.lazy(() => HashtagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagListRelationFilterSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagListRelationFilterSchema).optional()
}).strict();

export const HashtagOrderByWithRelationInputSchema: z.ZodType<Prisma.HashtagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagOrderByRelationAggregateInputSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const HashtagWhereUniqueInputSchema: z.ZodType<Prisma.HashtagWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    text: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    text: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  text: z.string().optional(),
  AND: z.union([ z.lazy(() => HashtagWhereInputSchema),z.lazy(() => HashtagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HashtagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HashtagWhereInputSchema),z.lazy(() => HashtagWhereInputSchema).array() ]).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagListRelationFilterSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagListRelationFilterSchema).optional()
}).strict());

export const HashtagOrderByWithAggregationInputSchema: z.ZodType<Prisma.HashtagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HashtagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HashtagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HashtagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HashtagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HashtagSumOrderByAggregateInputSchema).optional()
}).strict();

export const HashtagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HashtagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HashtagScalarWhereWithAggregatesInputSchema),z.lazy(() => HashtagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HashtagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HashtagScalarWhereWithAggregatesInputSchema),z.lazy(() => HashtagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserPlaceholderWhereInputSchema: z.ZodType<Prisma.UserPlaceholderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPlaceholderWhereInputSchema),z.lazy(() => UserPlaceholderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlaceholderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlaceholderWhereInputSchema),z.lazy(() => UserPlaceholderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailPattern: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashtagSuggestions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserPlaceholderOrderByWithRelationInputSchema: z.ZodType<Prisma.UserPlaceholderOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailPattern: z.lazy(() => SortOrderSchema).optional(),
  hashtagSuggestions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const UserPlaceholderWhereUniqueInputSchema: z.ZodType<Prisma.UserPlaceholderWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserPlaceholderWhereInputSchema),z.lazy(() => UserPlaceholderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlaceholderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlaceholderWhereInputSchema),z.lazy(() => UserPlaceholderWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailPattern: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashtagSuggestions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const UserPlaceholderOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserPlaceholderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailPattern: z.lazy(() => SortOrderSchema).optional(),
  hashtagSuggestions: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserPlaceholderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserPlaceholderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserPlaceholderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserPlaceholderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserPlaceholderSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserPlaceholderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserPlaceholderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserPlaceholderScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPlaceholderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPlaceholderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPlaceholderScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPlaceholderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailPattern: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashtagSuggestions: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  authId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  personality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagListRelationFilterSchema).optional(),
  photos: z.lazy(() => UserPhotoListRelationFilterSchema).optional(),
  settings: z.lazy(() => UserSettingsListRelationFilterSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  personality: z.lazy(() => SortOrderSchema).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hashtags: z.lazy(() => UserHashtagOrderByRelationAggregateInputSchema).optional(),
  photos: z.lazy(() => UserPhotoOrderByRelationAggregateInputSchema).optional(),
  settings: z.lazy(() => UserSettingsOrderByRelationAggregateInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    authId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
    authId: z.string(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    authId: z.string(),
    email: z.string(),
  }),
  z.object({
    authId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  authId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}) ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  personality: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagListRelationFilterSchema).optional(),
  photos: z.lazy(() => UserPhotoListRelationFilterSchema).optional(),
  settings: z.lazy(() => UserSettingsListRelationFilterSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  personality: z.lazy(() => SortOrderSchema).optional(),
  bio: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  authId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  personality: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bio: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserHashtagWhereInputSchema: z.ZodType<Prisma.UserHashtagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserHashtagWhereInputSchema),z.lazy(() => UserHashtagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserHashtagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserHashtagWhereInputSchema),z.lazy(() => UserHashtagWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  relevance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  hashtag: z.union([ z.lazy(() => HashtagScalarRelationFilterSchema),z.lazy(() => HashtagWhereInputSchema) ]).optional(),
}).strict();

export const UserHashtagOrderByWithRelationInputSchema: z.ZodType<Prisma.UserHashtagOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  hashtag: z.lazy(() => HashtagOrderByWithRelationInputSchema).optional()
}).strict();

export const UserHashtagWhereUniqueInputSchema: z.ZodType<Prisma.UserHashtagWhereUniqueInput> = z.object({
  userId_hashtagId: z.lazy(() => UserHashtagUserIdHashtagIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_hashtagId: z.lazy(() => UserHashtagUserIdHashtagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserHashtagWhereInputSchema),z.lazy(() => UserHashtagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserHashtagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserHashtagWhereInputSchema),z.lazy(() => UserHashtagWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  relevance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  hashtag: z.union([ z.lazy(() => HashtagScalarRelationFilterSchema),z.lazy(() => HashtagWhereInputSchema) ]).optional(),
}).strict());

export const UserHashtagOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserHashtagOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserHashtagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserHashtagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserHashtagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserHashtagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserHashtagSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserHashtagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserHashtagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserHashtagScalarWhereWithAggregatesInputSchema),z.lazy(() => UserHashtagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserHashtagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserHashtagScalarWhereWithAggregatesInputSchema),z.lazy(() => UserHashtagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  relevance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserSettingsWhereInputSchema: z.ZodType<Prisma.UserSettingsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserSettingsWhereInputSchema),z.lazy(() => UserSettingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserSettingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserSettingsWhereInputSchema),z.lazy(() => UserSettingsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserSettingsOrderByWithRelationInputSchema: z.ZodType<Prisma.UserSettingsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserSettingsWhereUniqueInputSchema: z.ZodType<Prisma.UserSettingsWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserSettingsWhereInputSchema),z.lazy(() => UserSettingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserSettingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserSettingsWhereInputSchema),z.lazy(() => UserSettingsWhereInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserSettingsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserSettingsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserSettingsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserSettingsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserSettingsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserSettingsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSettingsSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserSettingsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserSettingsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserSettingsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserSettingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserSettingsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserSettingsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserSettingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserPhotoWhereInputSchema: z.ZodType<Prisma.UserPhotoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPhotoWhereInputSchema),z.lazy(() => UserPhotoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPhotoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPhotoWhereInputSchema),z.lazy(() => UserPhotoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserPhotoOrderByWithRelationInputSchema: z.ZodType<Prisma.UserPhotoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserPhotoWhereUniqueInputSchema: z.ZodType<Prisma.UserPhotoWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserPhotoWhereInputSchema),z.lazy(() => UserPhotoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPhotoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPhotoWhereInputSchema),z.lazy(() => UserPhotoWhereInputSchema).array() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserPhotoOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserPhotoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserPhotoCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserPhotoAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserPhotoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserPhotoMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserPhotoSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserPhotoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserPhotoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserPhotoScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPhotoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPhotoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPhotoScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPhotoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const BubbleWhereInputSchema: z.ZodType<Prisma.BubbleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BubbleWhereInputSchema),z.lazy(() => BubbleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleWhereInputSchema),z.lazy(() => BubbleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lang: z.union([ z.lazy(() => EnumBubbleLangFilterSchema),z.lazy(() => BubbleLangSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hashtags: z.lazy(() => BubbleHashtagListRelationFilterSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionListRelationFilterSchema).optional()
}).strict();

export const BubbleOrderByWithRelationInputSchema: z.ZodType<Prisma.BubbleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lang: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  hashtags: z.lazy(() => BubbleHashtagOrderByRelationAggregateInputSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BubbleWhereUniqueInputSchema: z.ZodType<Prisma.BubbleWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => BubbleWhereInputSchema),z.lazy(() => BubbleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleWhereInputSchema),z.lazy(() => BubbleWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lang: z.union([ z.lazy(() => EnumBubbleLangFilterSchema),z.lazy(() => BubbleLangSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hashtags: z.lazy(() => BubbleHashtagListRelationFilterSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionListRelationFilterSchema).optional()
}).strict());

export const BubbleOrderByWithAggregationInputSchema: z.ZodType<Prisma.BubbleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lang: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BubbleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BubbleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BubbleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BubbleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BubbleSumOrderByAggregateInputSchema).optional()
}).strict();

export const BubbleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BubbleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BubbleScalarWhereWithAggregatesInputSchema),z.lazy(() => BubbleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleScalarWhereWithAggregatesInputSchema),z.lazy(() => BubbleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lang: z.union([ z.lazy(() => EnumBubbleLangWithAggregatesFilterSchema),z.lazy(() => BubbleLangSchema) ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BubbleHashtagWhereInputSchema: z.ZodType<Prisma.BubbleHashtagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BubbleHashtagWhereInputSchema),z.lazy(() => BubbleHashtagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleHashtagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleHashtagWhereInputSchema),z.lazy(() => BubbleHashtagWhereInputSchema).array() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bubble: z.union([ z.lazy(() => BubbleScalarRelationFilterSchema),z.lazy(() => BubbleWhereInputSchema) ]).optional(),
  hashtag: z.union([ z.lazy(() => HashtagScalarRelationFilterSchema),z.lazy(() => HashtagWhereInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagOrderByWithRelationInputSchema: z.ZodType<Prisma.BubbleHashtagOrderByWithRelationInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  bubble: z.lazy(() => BubbleOrderByWithRelationInputSchema).optional(),
  hashtag: z.lazy(() => HashtagOrderByWithRelationInputSchema).optional()
}).strict();

export const BubbleHashtagWhereUniqueInputSchema: z.ZodType<Prisma.BubbleHashtagWhereUniqueInput> = z.object({
  bubbleId_hashtagId: z.lazy(() => BubbleHashtagBubbleIdHashtagIdCompoundUniqueInputSchema)
})
.and(z.object({
  bubbleId_hashtagId: z.lazy(() => BubbleHashtagBubbleIdHashtagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => BubbleHashtagWhereInputSchema),z.lazy(() => BubbleHashtagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleHashtagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleHashtagWhereInputSchema),z.lazy(() => BubbleHashtagWhereInputSchema).array() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  bubble: z.union([ z.lazy(() => BubbleScalarRelationFilterSchema),z.lazy(() => BubbleWhereInputSchema) ]).optional(),
  hashtag: z.union([ z.lazy(() => HashtagScalarRelationFilterSchema),z.lazy(() => HashtagWhereInputSchema) ]).optional(),
}).strict());

export const BubbleHashtagOrderByWithAggregationInputSchema: z.ZodType<Prisma.BubbleHashtagOrderByWithAggregationInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BubbleHashtagCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BubbleHashtagAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BubbleHashtagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BubbleHashtagMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BubbleHashtagSumOrderByAggregateInputSchema).optional()
}).strict();

export const BubbleHashtagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BubbleHashtagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BubbleHashtagScalarWhereWithAggregatesInputSchema),z.lazy(() => BubbleHashtagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleHashtagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleHashtagScalarWhereWithAggregatesInputSchema),z.lazy(() => BubbleHashtagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserBubbleSubscriptionWhereInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserBubbleSubscriptionWhereInputSchema),z.lazy(() => UserBubbleSubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBubbleSubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBubbleSubscriptionWhereInputSchema),z.lazy(() => UserBubbleSubscriptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  acceptMatches: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  bubble: z.union([ z.lazy(() => BubbleScalarRelationFilterSchema),z.lazy(() => BubbleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  acceptMatches: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  bubble: z.lazy(() => BubbleOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserBubbleSubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserBubbleSubscriptionWhereInputSchema),z.lazy(() => UserBubbleSubscriptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBubbleSubscriptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBubbleSubscriptionWhereInputSchema),z.lazy(() => UserBubbleSubscriptionWhereInputSchema).array() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  acceptMatches: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  bubble: z.union([ z.lazy(() => BubbleScalarRelationFilterSchema),z.lazy(() => BubbleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserBubbleSubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  acceptMatches: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserBubbleSubscriptionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserBubbleSubscriptionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserBubbleSubscriptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserBubbleSubscriptionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserBubbleSubscriptionSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  acceptMatches: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  weight: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const HashtagCreateInputSchema: z.ZodType<Prisma.HashtagCreateInput> = z.object({
  text: z.string(),
  eventHashtags: z.lazy(() => BubbleHashtagCreateNestedManyWithoutHashtagInputSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagCreateNestedManyWithoutHashtagInputSchema).optional()
}).strict();

export const HashtagUncheckedCreateInputSchema: z.ZodType<Prisma.HashtagUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  eventHashtags: z.lazy(() => BubbleHashtagUncheckedCreateNestedManyWithoutHashtagInputSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagUncheckedCreateNestedManyWithoutHashtagInputSchema).optional()
}).strict();

export const HashtagUpdateInputSchema: z.ZodType<Prisma.HashtagUpdateInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagUpdateManyWithoutHashtagNestedInputSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagUpdateManyWithoutHashtagNestedInputSchema).optional()
}).strict();

export const HashtagUncheckedUpdateInputSchema: z.ZodType<Prisma.HashtagUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagUncheckedUpdateManyWithoutHashtagNestedInputSchema).optional(),
  userHashtags: z.lazy(() => UserHashtagUncheckedUpdateManyWithoutHashtagNestedInputSchema).optional()
}).strict();

export const HashtagCreateManyInputSchema: z.ZodType<Prisma.HashtagCreateManyInput> = z.object({
  id: z.number().int().optional(),
  text: z.string()
}).strict();

export const HashtagUpdateManyMutationInputSchema: z.ZodType<Prisma.HashtagUpdateManyMutationInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HashtagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HashtagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  name: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPlaceholderCreateInputSchema: z.ZodType<Prisma.UserPlaceholderCreateInput> = z.object({
  name: z.string(),
  emailPattern: z.string(),
  hashtagSuggestions: z.string().optional().nullable()
}).strict();

export const UserPlaceholderUncheckedCreateInputSchema: z.ZodType<Prisma.UserPlaceholderUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  emailPattern: z.string(),
  hashtagSuggestions: z.string().optional().nullable()
}).strict();

export const UserPlaceholderUpdateInputSchema: z.ZodType<Prisma.UserPlaceholderUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailPattern: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagSuggestions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserPlaceholderUncheckedUpdateInputSchema: z.ZodType<Prisma.UserPlaceholderUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailPattern: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagSuggestions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserPlaceholderCreateManyInputSchema: z.ZodType<Prisma.UserPlaceholderCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  emailPattern: z.string(),
  hashtagSuggestions: z.string().optional().nullable()
}).strict();

export const UserPlaceholderUpdateManyMutationInputSchema: z.ZodType<Prisma.UserPlaceholderUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailPattern: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagSuggestions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserPlaceholderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserPlaceholderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailPattern: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagSuggestions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagCreateNestedManyWithoutUserInputSchema).optional(),
  photos: z.lazy(() => UserPhotoCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUpdateManyWithoutUserNestedInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserHashtagCreateInputSchema: z.ZodType<Prisma.UserHashtagCreateInput> = z.object({
  relevance: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutHashtagsInputSchema),
  hashtag: z.lazy(() => HashtagCreateNestedOneWithoutUserHashtagsInputSchema)
}).strict();

export const UserHashtagUncheckedCreateInputSchema: z.ZodType<Prisma.UserHashtagUncheckedCreateInput> = z.object({
  userId: z.number().int(),
  hashtagId: z.number().int(),
  relevance: z.number()
}).strict();

export const UserHashtagUpdateInputSchema: z.ZodType<Prisma.UserHashtagUpdateInput> = z.object({
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHashtagsNestedInputSchema).optional(),
  hashtag: z.lazy(() => HashtagUpdateOneRequiredWithoutUserHashtagsNestedInputSchema).optional()
}).strict();

export const UserHashtagUncheckedUpdateInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserHashtagCreateManyInputSchema: z.ZodType<Prisma.UserHashtagCreateManyInput> = z.object({
  userId: z.number().int(),
  hashtagId: z.number().int(),
  relevance: z.number()
}).strict();

export const UserHashtagUpdateManyMutationInputSchema: z.ZodType<Prisma.UserHashtagUpdateManyMutationInput> = z.object({
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserHashtagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserSettingsCreateInputSchema: z.ZodType<Prisma.UserSettingsCreateInput> = z.object({
  key: z.string(),
  value: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutSettingsInputSchema)
}).strict();

export const UserSettingsUncheckedCreateInputSchema: z.ZodType<Prisma.UserSettingsUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string(),
  userId: z.number().int()
}).strict();

export const UserSettingsUpdateInputSchema: z.ZodType<Prisma.UserSettingsUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSettingsNestedInputSchema).optional()
}).strict();

export const UserSettingsUncheckedUpdateInputSchema: z.ZodType<Prisma.UserSettingsUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserSettingsCreateManyInputSchema: z.ZodType<Prisma.UserSettingsCreateManyInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string(),
  userId: z.number().int()
}).strict();

export const UserSettingsUpdateManyMutationInputSchema: z.ZodType<Prisma.UserSettingsUpdateManyMutationInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserSettingsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserSettingsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPhotoCreateInputSchema: z.ZodType<Prisma.UserPhotoCreateInput> = z.object({
  url: z.string(),
  caption: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutPhotosInputSchema)
}).strict();

export const UserPhotoUncheckedCreateInputSchema: z.ZodType<Prisma.UserPhotoUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  caption: z.string(),
  userId: z.number().int()
}).strict();

export const UserPhotoUpdateInputSchema: z.ZodType<Prisma.UserPhotoUpdateInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPhotosNestedInputSchema).optional()
}).strict();

export const UserPhotoUncheckedUpdateInputSchema: z.ZodType<Prisma.UserPhotoUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPhotoCreateManyInputSchema: z.ZodType<Prisma.UserPhotoCreateManyInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  caption: z.string(),
  userId: z.number().int()
}).strict();

export const UserPhotoUpdateManyMutationInputSchema: z.ZodType<Prisma.UserPhotoUpdateManyMutationInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPhotoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserPhotoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleCreateInputSchema: z.ZodType<Prisma.BubbleCreateInput> = z.object({
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hashtags: z.lazy(() => BubbleHashtagCreateNestedManyWithoutBubbleInputSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionCreateNestedManyWithoutBubbleInputSchema).optional()
}).strict();

export const BubbleUncheckedCreateInputSchema: z.ZodType<Prisma.BubbleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hashtags: z.lazy(() => BubbleHashtagUncheckedCreateNestedManyWithoutBubbleInputSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedCreateNestedManyWithoutBubbleInputSchema).optional()
}).strict();

export const BubbleUpdateInputSchema: z.ZodType<Prisma.BubbleUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hashtags: z.lazy(() => BubbleHashtagUpdateManyWithoutBubbleNestedInputSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionUpdateManyWithoutBubbleNestedInputSchema).optional()
}).strict();

export const BubbleUncheckedUpdateInputSchema: z.ZodType<Prisma.BubbleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hashtags: z.lazy(() => BubbleHashtagUncheckedUpdateManyWithoutBubbleNestedInputSchema).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleNestedInputSchema).optional()
}).strict();

export const BubbleCreateManyInputSchema: z.ZodType<Prisma.BubbleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BubbleUpdateManyMutationInputSchema: z.ZodType<Prisma.BubbleUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BubbleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagCreateInputSchema: z.ZodType<Prisma.BubbleHashtagCreateInput> = z.object({
  bubble: z.lazy(() => BubbleCreateNestedOneWithoutHashtagsInputSchema),
  hashtag: z.lazy(() => HashtagCreateNestedOneWithoutEventHashtagsInputSchema)
}).strict();

export const BubbleHashtagUncheckedCreateInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedCreateInput> = z.object({
  bubbleId: z.number().int(),
  hashtagId: z.number().int()
}).strict();

export const BubbleHashtagUpdateInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateInput> = z.object({
  bubble: z.lazy(() => BubbleUpdateOneRequiredWithoutHashtagsNestedInputSchema).optional(),
  hashtag: z.lazy(() => HashtagUpdateOneRequiredWithoutEventHashtagsNestedInputSchema).optional()
}).strict();

export const BubbleHashtagUncheckedUpdateInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateInput> = z.object({
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagCreateManyInputSchema: z.ZodType<Prisma.BubbleHashtagCreateManyInput> = z.object({
  bubbleId: z.number().int(),
  hashtagId: z.number().int()
}).strict();

export const BubbleHashtagUpdateManyMutationInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyMutationInput> = z.object({
}).strict();

export const BubbleHashtagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateManyInput> = z.object({
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionCreateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number(),
  bubble: z.lazy(() => BubbleCreateNestedOneWithoutUserSubscriptionsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutBubbleSubscriptionsInputSchema)
}).strict();

export const UserBubbleSubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  bubbleId: z.number().int(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number()
}).strict();

export const UserBubbleSubscriptionUpdateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bubble: z.lazy(() => BubbleUpdateOneRequiredWithoutUserSubscriptionsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBubbleSubscriptionsNestedInputSchema).optional()
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionCreateManyInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  bubbleId: z.number().int(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number()
}).strict();

export const UserBubbleSubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BubbleHashtagListRelationFilterSchema: z.ZodType<Prisma.BubbleHashtagListRelationFilter> = z.object({
  every: z.lazy(() => BubbleHashtagWhereInputSchema).optional(),
  some: z.lazy(() => BubbleHashtagWhereInputSchema).optional(),
  none: z.lazy(() => BubbleHashtagWhereInputSchema).optional()
}).strict();

export const UserHashtagListRelationFilterSchema: z.ZodType<Prisma.UserHashtagListRelationFilter> = z.object({
  every: z.lazy(() => UserHashtagWhereInputSchema).optional(),
  some: z.lazy(() => UserHashtagWhereInputSchema).optional(),
  none: z.lazy(() => UserHashtagWhereInputSchema).optional()
}).strict();

export const BubbleHashtagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BubbleHashtagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserHashtagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserHashtagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HashtagCountOrderByAggregateInputSchema: z.ZodType<Prisma.HashtagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HashtagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HashtagAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HashtagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HashtagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HashtagMinOrderByAggregateInputSchema: z.ZodType<Prisma.HashtagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HashtagSumOrderByAggregateInputSchema: z.ZodType<Prisma.HashtagSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserPlaceholderCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlaceholderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailPattern: z.lazy(() => SortOrderSchema).optional(),
  hashtagSuggestions: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlaceholderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlaceholderAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlaceholderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlaceholderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailPattern: z.lazy(() => SortOrderSchema).optional(),
  hashtagSuggestions: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlaceholderMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlaceholderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  emailPattern: z.lazy(() => SortOrderSchema).optional(),
  hashtagSuggestions: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPlaceholderSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserPlaceholderSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserPhotoListRelationFilterSchema: z.ZodType<Prisma.UserPhotoListRelationFilter> = z.object({
  every: z.lazy(() => UserPhotoWhereInputSchema).optional(),
  some: z.lazy(() => UserPhotoWhereInputSchema).optional(),
  none: z.lazy(() => UserPhotoWhereInputSchema).optional()
}).strict();

export const UserSettingsListRelationFilterSchema: z.ZodType<Prisma.UserSettingsListRelationFilter> = z.object({
  every: z.lazy(() => UserSettingsWhereInputSchema).optional(),
  some: z.lazy(() => UserSettingsWhereInputSchema).optional(),
  none: z.lazy(() => UserSettingsWhereInputSchema).optional()
}).strict();

export const UserBubbleSubscriptionListRelationFilterSchema: z.ZodType<Prisma.UserBubbleSubscriptionListRelationFilter> = z.object({
  every: z.lazy(() => UserBubbleSubscriptionWhereInputSchema).optional(),
  some: z.lazy(() => UserBubbleSubscriptionWhereInputSchema).optional(),
  none: z.lazy(() => UserBubbleSubscriptionWhereInputSchema).optional()
}).strict();

export const UserPhotoOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserPhotoOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSettingsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserSettingsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBubbleSubscriptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  personality: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  personality: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  authId: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  birthDate: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  personality: z.lazy(() => SortOrderSchema).optional(),
  bio: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const HashtagScalarRelationFilterSchema: z.ZodType<Prisma.HashtagScalarRelationFilter> = z.object({
  is: z.lazy(() => HashtagWhereInputSchema).optional(),
  isNot: z.lazy(() => HashtagWhereInputSchema).optional()
}).strict();

export const UserHashtagUserIdHashtagIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserHashtagUserIdHashtagIdCompoundUniqueInput> = z.object({
  userId: z.number(),
  hashtagId: z.number()
}).strict();

export const UserHashtagCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserHashtagCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserHashtagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserHashtagAvgOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserHashtagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserHashtagMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserHashtagMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserHashtagMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserHashtagSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserHashtagSumOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional(),
  relevance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const UserSettingsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserSettingsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSettingsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserSettingsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSettingsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserSettingsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSettingsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserSettingsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSettingsSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSettingsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPhotoCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserPhotoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPhotoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserPhotoAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPhotoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserPhotoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPhotoMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserPhotoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  caption: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPhotoSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserPhotoSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBubbleLangFilterSchema: z.ZodType<Prisma.EnumBubbleLangFilter> = z.object({
  equals: z.lazy(() => BubbleLangSchema).optional(),
  in: z.lazy(() => BubbleLangSchema).array().optional(),
  notIn: z.lazy(() => BubbleLangSchema).array().optional(),
  not: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => NestedEnumBubbleLangFilterSchema) ]).optional(),
}).strict();

export const BubbleCountOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lang: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lang: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleMinOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  lang: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleSumOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumBubbleLangWithAggregatesFilterSchema: z.ZodType<Prisma.EnumBubbleLangWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BubbleLangSchema).optional(),
  in: z.lazy(() => BubbleLangSchema).array().optional(),
  notIn: z.lazy(() => BubbleLangSchema).array().optional(),
  not: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => NestedEnumBubbleLangWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBubbleLangFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBubbleLangFilterSchema).optional()
}).strict();

export const BubbleScalarRelationFilterSchema: z.ZodType<Prisma.BubbleScalarRelationFilter> = z.object({
  is: z.lazy(() => BubbleWhereInputSchema).optional(),
  isNot: z.lazy(() => BubbleWhereInputSchema).optional()
}).strict();

export const BubbleHashtagBubbleIdHashtagIdCompoundUniqueInputSchema: z.ZodType<Prisma.BubbleHashtagBubbleIdHashtagIdCompoundUniqueInput> = z.object({
  bubbleId: z.number(),
  hashtagId: z.number()
}).strict();

export const BubbleHashtagCountOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleHashtagCountOrderByAggregateInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleHashtagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleHashtagAvgOrderByAggregateInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleHashtagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleHashtagMaxOrderByAggregateInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleHashtagMinOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleHashtagMinOrderByAggregateInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleHashtagSumOrderByAggregateInputSchema: z.ZodType<Prisma.BubbleHashtagSumOrderByAggregateInput> = z.object({
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  hashtagId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBubbleSubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  acceptMatches: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBubbleSubscriptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBubbleSubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  acceptMatches: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBubbleSubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  acceptMatches: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserBubbleSubscriptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bubbleId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BubbleHashtagCreateNestedManyWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagCreateNestedManyWithoutHashtagInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserHashtagCreateNestedManyWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagCreateNestedManyWithoutHashtagInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BubbleHashtagUncheckedCreateNestedManyWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedCreateNestedManyWithoutHashtagInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserHashtagUncheckedCreateNestedManyWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUncheckedCreateNestedManyWithoutHashtagInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BubbleHashtagUpdateManyWithoutHashtagNestedInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyWithoutHashtagNestedInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutHashtagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BubbleHashtagScalarWhereInputSchema),z.lazy(() => BubbleHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserHashtagUpdateManyWithoutHashtagNestedInputSchema: z.ZodType<Prisma.UserHashtagUpdateManyWithoutHashtagNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserHashtagUpdateManyWithWhereWithoutHashtagInputSchema),z.lazy(() => UserHashtagUpdateManyWithWhereWithoutHashtagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserHashtagScalarWhereInputSchema),z.lazy(() => UserHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BubbleHashtagUncheckedUpdateManyWithoutHashtagNestedInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateManyWithoutHashtagNestedInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutHashtagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BubbleHashtagScalarWhereInputSchema),z.lazy(() => BubbleHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserHashtagUncheckedUpdateManyWithoutHashtagNestedInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateManyWithoutHashtagNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutHashtagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyHashtagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema),z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserHashtagUpdateManyWithWhereWithoutHashtagInputSchema),z.lazy(() => UserHashtagUpdateManyWithWhereWithoutHashtagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserHashtagScalarWhereInputSchema),z.lazy(() => UserHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UserHashtagCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutUserInputSchema),z.lazy(() => UserHashtagCreateWithoutUserInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPhotoCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserPhotoCreateWithoutUserInputSchema),z.lazy(() => UserPhotoCreateWithoutUserInputSchema).array(),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPhotoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserSettingsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserSettingsCreateWithoutUserInputSchema),z.lazy(() => UserSettingsCreateWithoutUserInputSchema).array(),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserSettingsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserHashtagUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutUserInputSchema),z.lazy(() => UserHashtagCreateWithoutUserInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPhotoUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserPhotoCreateWithoutUserInputSchema),z.lazy(() => UserPhotoCreateWithoutUserInputSchema).array(),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPhotoCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserSettingsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserSettingsCreateWithoutUserInputSchema),z.lazy(() => UserSettingsCreateWithoutUserInputSchema).array(),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserSettingsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserHashtagUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserHashtagUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutUserInputSchema),z.lazy(() => UserHashtagCreateWithoutUserInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserHashtagUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserHashtagUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserHashtagScalarWhereInputSchema),z.lazy(() => UserHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserPhotoUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserPhotoUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPhotoCreateWithoutUserInputSchema),z.lazy(() => UserPhotoCreateWithoutUserInputSchema).array(),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPhotoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPhotoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPhotoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPhotoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPhotoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPhotoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserPhotoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPhotoScalarWhereInputSchema),z.lazy(() => UserPhotoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserSettingsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserSettingsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserSettingsCreateWithoutUserInputSchema),z.lazy(() => UserSettingsCreateWithoutUserInputSchema).array(),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserSettingsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserSettingsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserSettingsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserSettingsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserSettingsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserSettingsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserSettingsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserSettingsScalarWhereInputSchema),z.lazy(() => UserSettingsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserHashtagUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutUserInputSchema),z.lazy(() => UserHashtagCreateWithoutUserInputSchema).array(),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserHashtagCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserHashtagUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserHashtagCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserHashtagWhereUniqueInputSchema),z.lazy(() => UserHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserHashtagUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserHashtagUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserHashtagUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserHashtagScalarWhereInputSchema),z.lazy(() => UserHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserPhotoUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserPhotoUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPhotoCreateWithoutUserInputSchema),z.lazy(() => UserPhotoCreateWithoutUserInputSchema).array(),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPhotoCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPhotoUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPhotoUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPhotoCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPhotoWhereUniqueInputSchema),z.lazy(() => UserPhotoWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPhotoUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPhotoUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPhotoUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserPhotoUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPhotoScalarWhereInputSchema),z.lazy(() => UserPhotoScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserSettingsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserSettingsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserSettingsCreateWithoutUserInputSchema),z.lazy(() => UserSettingsCreateWithoutUserInputSchema).array(),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserSettingsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserSettingsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserSettingsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserSettingsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserSettingsWhereUniqueInputSchema),z.lazy(() => UserSettingsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserSettingsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserSettingsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserSettingsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserSettingsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserSettingsScalarWhereInputSchema),z.lazy(() => UserSettingsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutHashtagsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHashtagsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHashtagsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const HashtagCreateNestedOneWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagCreateNestedOneWithoutUserHashtagsInput> = z.object({
  create: z.union([ z.lazy(() => HashtagCreateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutUserHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HashtagCreateOrConnectWithoutUserHashtagsInputSchema).optional(),
  connect: z.lazy(() => HashtagWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutHashtagsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHashtagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHashtagsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHashtagsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHashtagsInputSchema),z.lazy(() => UserUpdateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHashtagsInputSchema) ]).optional(),
}).strict();

export const HashtagUpdateOneRequiredWithoutUserHashtagsNestedInputSchema: z.ZodType<Prisma.HashtagUpdateOneRequiredWithoutUserHashtagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => HashtagCreateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutUserHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HashtagCreateOrConnectWithoutUserHashtagsInputSchema).optional(),
  upsert: z.lazy(() => HashtagUpsertWithoutUserHashtagsInputSchema).optional(),
  connect: z.lazy(() => HashtagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HashtagUpdateToOneWithWhereWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUpdateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedUpdateWithoutUserHashtagsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSettingsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSettingsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSettingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSettingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSettingsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSettingsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSettingsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSettingsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSettingsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSettingsInputSchema),z.lazy(() => UserUpdateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSettingsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPhotosInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPhotosInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedCreateWithoutPhotosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPhotosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPhotosNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPhotosNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedCreateWithoutPhotosInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPhotosInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPhotosInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPhotosInputSchema),z.lazy(() => UserUpdateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPhotosInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagCreateNestedManyWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagCreateNestedManyWithoutBubbleInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyBubbleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionCreateNestedManyWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateNestedManyWithoutBubbleInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyBubbleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BubbleHashtagUncheckedCreateNestedManyWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedCreateNestedManyWithoutBubbleInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyBubbleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedCreateNestedManyWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedCreateNestedManyWithoutBubbleInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyBubbleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumBubbleLangFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumBubbleLangFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => BubbleLangSchema).optional()
}).strict();

export const BubbleHashtagUpdateManyWithoutBubbleNestedInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyWithoutBubbleNestedInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyBubbleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutBubbleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BubbleHashtagScalarWhereInputSchema),z.lazy(() => BubbleHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUpdateManyWithoutBubbleNestedInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyWithoutBubbleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyBubbleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutBubbleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BubbleHashtagUncheckedUpdateManyWithoutBubbleNestedInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateManyWithoutBubbleNestedInput> = z.object({
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema).array(),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUpsertWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BubbleHashtagCreateManyBubbleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BubbleHashtagWhereUniqueInputSchema),z.lazy(() => BubbleHashtagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUpdateWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUpdateManyWithWhereWithoutBubbleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BubbleHashtagScalarWhereInputSchema),z.lazy(() => BubbleHashtagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleNestedInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema).array(),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUpsertWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserBubbleSubscriptionCreateManyBubbleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateWithWhereUniqueWithoutBubbleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUpdateManyWithWhereWithoutBubbleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BubbleCreateNestedOneWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleCreateNestedOneWithoutHashtagsInput> = z.object({
  create: z.union([ z.lazy(() => BubbleCreateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BubbleCreateOrConnectWithoutHashtagsInputSchema).optional(),
  connect: z.lazy(() => BubbleWhereUniqueInputSchema).optional()
}).strict();

export const HashtagCreateNestedOneWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagCreateNestedOneWithoutEventHashtagsInput> = z.object({
  create: z.union([ z.lazy(() => HashtagCreateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutEventHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HashtagCreateOrConnectWithoutEventHashtagsInputSchema).optional(),
  connect: z.lazy(() => HashtagWhereUniqueInputSchema).optional()
}).strict();

export const BubbleUpdateOneRequiredWithoutHashtagsNestedInputSchema: z.ZodType<Prisma.BubbleUpdateOneRequiredWithoutHashtagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BubbleCreateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BubbleCreateOrConnectWithoutHashtagsInputSchema).optional(),
  upsert: z.lazy(() => BubbleUpsertWithoutHashtagsInputSchema).optional(),
  connect: z.lazy(() => BubbleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BubbleUpdateToOneWithWhereWithoutHashtagsInputSchema),z.lazy(() => BubbleUpdateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedUpdateWithoutHashtagsInputSchema) ]).optional(),
}).strict();

export const HashtagUpdateOneRequiredWithoutEventHashtagsNestedInputSchema: z.ZodType<Prisma.HashtagUpdateOneRequiredWithoutEventHashtagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => HashtagCreateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutEventHashtagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HashtagCreateOrConnectWithoutEventHashtagsInputSchema).optional(),
  upsert: z.lazy(() => HashtagUpsertWithoutEventHashtagsInputSchema).optional(),
  connect: z.lazy(() => HashtagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HashtagUpdateToOneWithWhereWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUpdateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedUpdateWithoutEventHashtagsInputSchema) ]).optional(),
}).strict();

export const BubbleCreateNestedOneWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleCreateNestedOneWithoutUserSubscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => BubbleCreateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutUserSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BubbleCreateOrConnectWithoutUserSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => BubbleWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBubbleSubscriptionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBubbleSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBubbleSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BubbleUpdateOneRequiredWithoutUserSubscriptionsNestedInputSchema: z.ZodType<Prisma.BubbleUpdateOneRequiredWithoutUserSubscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BubbleCreateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutUserSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BubbleCreateOrConnectWithoutUserSubscriptionsInputSchema).optional(),
  upsert: z.lazy(() => BubbleUpsertWithoutUserSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => BubbleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BubbleUpdateToOneWithWhereWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUpdateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedUpdateWithoutUserSubscriptionsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutBubbleSubscriptionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBubbleSubscriptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBubbleSubscriptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBubbleSubscriptionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBubbleSubscriptionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUpdateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBubbleSubscriptionsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumBubbleLangFilterSchema: z.ZodType<Prisma.NestedEnumBubbleLangFilter> = z.object({
  equals: z.lazy(() => BubbleLangSchema).optional(),
  in: z.lazy(() => BubbleLangSchema).array().optional(),
  notIn: z.lazy(() => BubbleLangSchema).array().optional(),
  not: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => NestedEnumBubbleLangFilterSchema) ]).optional(),
}).strict();

export const NestedEnumBubbleLangWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumBubbleLangWithAggregatesFilter> = z.object({
  equals: z.lazy(() => BubbleLangSchema).optional(),
  in: z.lazy(() => BubbleLangSchema).array().optional(),
  notIn: z.lazy(() => BubbleLangSchema).array().optional(),
  not: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => NestedEnumBubbleLangWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumBubbleLangFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumBubbleLangFilterSchema).optional()
}).strict();

export const BubbleHashtagCreateWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagCreateWithoutHashtagInput> = z.object({
  bubble: z.lazy(() => BubbleCreateNestedOneWithoutHashtagsInputSchema)
}).strict();

export const BubbleHashtagUncheckedCreateWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedCreateWithoutHashtagInput> = z.object({
  bubbleId: z.number().int()
}).strict();

export const BubbleHashtagCreateOrConnectWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagCreateOrConnectWithoutHashtagInput> = z.object({
  where: z.lazy(() => BubbleHashtagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema) ]),
}).strict();

export const BubbleHashtagCreateManyHashtagInputEnvelopeSchema: z.ZodType<Prisma.BubbleHashtagCreateManyHashtagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BubbleHashtagCreateManyHashtagInputSchema),z.lazy(() => BubbleHashtagCreateManyHashtagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserHashtagCreateWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagCreateWithoutHashtagInput> = z.object({
  relevance: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutHashtagsInputSchema)
}).strict();

export const UserHashtagUncheckedCreateWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUncheckedCreateWithoutHashtagInput> = z.object({
  userId: z.number().int(),
  relevance: z.number()
}).strict();

export const UserHashtagCreateOrConnectWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagCreateOrConnectWithoutHashtagInput> = z.object({
  where: z.lazy(() => UserHashtagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema) ]),
}).strict();

export const UserHashtagCreateManyHashtagInputEnvelopeSchema: z.ZodType<Prisma.UserHashtagCreateManyHashtagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserHashtagCreateManyHashtagInputSchema),z.lazy(() => UserHashtagCreateManyHashtagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BubbleHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUpsertWithWhereUniqueWithoutHashtagInput> = z.object({
  where: z.lazy(() => BubbleHashtagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BubbleHashtagUpdateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedUpdateWithoutHashtagInputSchema) ]),
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutHashtagInputSchema) ]),
}).strict();

export const BubbleHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateWithWhereUniqueWithoutHashtagInput> = z.object({
  where: z.lazy(() => BubbleHashtagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BubbleHashtagUpdateWithoutHashtagInputSchema),z.lazy(() => BubbleHashtagUncheckedUpdateWithoutHashtagInputSchema) ]),
}).strict();

export const BubbleHashtagUpdateManyWithWhereWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyWithWhereWithoutHashtagInput> = z.object({
  where: z.lazy(() => BubbleHashtagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BubbleHashtagUpdateManyMutationInputSchema),z.lazy(() => BubbleHashtagUncheckedUpdateManyWithoutHashtagInputSchema) ]),
}).strict();

export const BubbleHashtagScalarWhereInputSchema: z.ZodType<Prisma.BubbleHashtagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BubbleHashtagScalarWhereInputSchema),z.lazy(() => BubbleHashtagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BubbleHashtagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BubbleHashtagScalarWhereInputSchema),z.lazy(() => BubbleHashtagScalarWhereInputSchema).array() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserHashtagUpsertWithWhereUniqueWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUpsertWithWhereUniqueWithoutHashtagInput> = z.object({
  where: z.lazy(() => UserHashtagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserHashtagUpdateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedUpdateWithoutHashtagInputSchema) ]),
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutHashtagInputSchema) ]),
}).strict();

export const UserHashtagUpdateWithWhereUniqueWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUpdateWithWhereUniqueWithoutHashtagInput> = z.object({
  where: z.lazy(() => UserHashtagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserHashtagUpdateWithoutHashtagInputSchema),z.lazy(() => UserHashtagUncheckedUpdateWithoutHashtagInputSchema) ]),
}).strict();

export const UserHashtagUpdateManyWithWhereWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUpdateManyWithWhereWithoutHashtagInput> = z.object({
  where: z.lazy(() => UserHashtagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserHashtagUpdateManyMutationInputSchema),z.lazy(() => UserHashtagUncheckedUpdateManyWithoutHashtagInputSchema) ]),
}).strict();

export const UserHashtagScalarWhereInputSchema: z.ZodType<Prisma.UserHashtagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserHashtagScalarWhereInputSchema),z.lazy(() => UserHashtagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserHashtagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserHashtagScalarWhereInputSchema),z.lazy(() => UserHashtagScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hashtagId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  relevance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const UserHashtagCreateWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagCreateWithoutUserInput> = z.object({
  relevance: z.number(),
  hashtag: z.lazy(() => HashtagCreateNestedOneWithoutUserHashtagsInputSchema)
}).strict();

export const UserHashtagUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUncheckedCreateWithoutUserInput> = z.object({
  hashtagId: z.number().int(),
  relevance: z.number()
}).strict();

export const UserHashtagCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserHashtagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserHashtagCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserHashtagCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserHashtagCreateManyUserInputSchema),z.lazy(() => UserHashtagCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserPhotoCreateWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoCreateWithoutUserInput> = z.object({
  url: z.string(),
  caption: z.string()
}).strict();

export const UserPhotoUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  caption: z.string()
}).strict();

export const UserPhotoCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserPhotoWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserPhotoCreateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserPhotoCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserPhotoCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserPhotoCreateManyUserInputSchema),z.lazy(() => UserPhotoCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserSettingsCreateWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsCreateWithoutUserInput> = z.object({
  key: z.string(),
  value: z.string()
}).strict();

export const UserSettingsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string()
}).strict();

export const UserSettingsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserSettingsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserSettingsCreateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserSettingsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserSettingsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserSettingsCreateManyUserInputSchema),z.lazy(() => UserSettingsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserBubbleSubscriptionCreateWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number(),
  bubble: z.lazy(() => BubbleCreateNestedOneWithoutUserSubscriptionsInputSchema)
}).strict();

export const UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  bubbleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number()
}).strict();

export const UserBubbleSubscriptionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserBubbleSubscriptionCreateManyUserInputSchema),z.lazy(() => UserBubbleSubscriptionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserHashtagUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserHashtagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserHashtagUpdateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserHashtagCreateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserHashtagUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserHashtagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserHashtagUpdateWithoutUserInputSchema),z.lazy(() => UserHashtagUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserHashtagUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserHashtagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserHashtagUpdateManyMutationInputSchema),z.lazy(() => UserHashtagUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserPhotoUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserPhotoWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserPhotoUpdateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserPhotoCreateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserPhotoUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserPhotoWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserPhotoUpdateWithoutUserInputSchema),z.lazy(() => UserPhotoUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserPhotoUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserPhotoScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserPhotoUpdateManyMutationInputSchema),z.lazy(() => UserPhotoUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserPhotoScalarWhereInputSchema: z.ZodType<Prisma.UserPhotoScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPhotoScalarWhereInputSchema),z.lazy(() => UserPhotoScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPhotoScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPhotoScalarWhereInputSchema),z.lazy(() => UserPhotoScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  caption: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserSettingsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserSettingsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserSettingsUpdateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserSettingsCreateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserSettingsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserSettingsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserSettingsUpdateWithoutUserInputSchema),z.lazy(() => UserSettingsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserSettingsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserSettingsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserSettingsUpdateManyMutationInputSchema),z.lazy(() => UserSettingsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserSettingsScalarWhereInputSchema: z.ZodType<Prisma.UserSettingsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserSettingsScalarWhereInputSchema),z.lazy(() => UserSettingsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserSettingsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserSettingsScalarWhereInputSchema),z.lazy(() => UserSettingsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserBubbleSubscriptionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithoutUserInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateManyMutationInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionScalarWhereInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bubbleId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  acceptMatches: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateWithoutHashtagsInputSchema: z.ZodType<Prisma.UserCreateWithoutHashtagsInput> = z.object({
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  photos: z.lazy(() => UserPhotoCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHashtagsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHashtagsInput> = z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  photos: z.lazy(() => UserPhotoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHashtagsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHashtagsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHashtagsInputSchema) ]),
}).strict();

export const HashtagCreateWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagCreateWithoutUserHashtagsInput> = z.object({
  text: z.string(),
  eventHashtags: z.lazy(() => BubbleHashtagCreateNestedManyWithoutHashtagInputSchema).optional()
}).strict();

export const HashtagUncheckedCreateWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagUncheckedCreateWithoutUserHashtagsInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  eventHashtags: z.lazy(() => BubbleHashtagUncheckedCreateNestedManyWithoutHashtagInputSchema).optional()
}).strict();

export const HashtagCreateOrConnectWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagCreateOrConnectWithoutUserHashtagsInput> = z.object({
  where: z.lazy(() => HashtagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HashtagCreateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutUserHashtagsInputSchema) ]),
}).strict();

export const UserUpsertWithoutHashtagsInputSchema: z.ZodType<Prisma.UserUpsertWithoutHashtagsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHashtagsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedCreateWithoutHashtagsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHashtagsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHashtagsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHashtagsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHashtagsInputSchema) ]),
}).strict();

export const UserUpdateWithoutHashtagsInputSchema: z.ZodType<Prisma.UserUpdateWithoutHashtagsInput> = z.object({
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.lazy(() => UserPhotoUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHashtagsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHashtagsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  photos: z.lazy(() => UserPhotoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const HashtagUpsertWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagUpsertWithoutUserHashtagsInput> = z.object({
  update: z.union([ z.lazy(() => HashtagUpdateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedUpdateWithoutUserHashtagsInputSchema) ]),
  create: z.union([ z.lazy(() => HashtagCreateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutUserHashtagsInputSchema) ]),
  where: z.lazy(() => HashtagWhereInputSchema).optional()
}).strict();

export const HashtagUpdateToOneWithWhereWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagUpdateToOneWithWhereWithoutUserHashtagsInput> = z.object({
  where: z.lazy(() => HashtagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HashtagUpdateWithoutUserHashtagsInputSchema),z.lazy(() => HashtagUncheckedUpdateWithoutUserHashtagsInputSchema) ]),
}).strict();

export const HashtagUpdateWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagUpdateWithoutUserHashtagsInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagUpdateManyWithoutHashtagNestedInputSchema).optional()
}).strict();

export const HashtagUncheckedUpdateWithoutUserHashtagsInputSchema: z.ZodType<Prisma.HashtagUncheckedUpdateWithoutUserHashtagsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventHashtags: z.lazy(() => BubbleHashtagUncheckedUpdateManyWithoutHashtagNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSettingsInputSchema: z.ZodType<Prisma.UserCreateWithoutSettingsInput> = z.object({
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagCreateNestedManyWithoutUserInputSchema).optional(),
  photos: z.lazy(() => UserPhotoCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSettingsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSettingsInput> = z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSettingsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSettingsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSettingsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSettingsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSettingsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSettingsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSettingsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSettingsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSettingsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSettingsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSettingsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSettingsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSettingsInput> = z.object({
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUpdateManyWithoutUserNestedInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSettingsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSettingsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPhotosInputSchema: z.ZodType<Prisma.UserCreateWithoutPhotosInput> = z.object({
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPhotosInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPhotosInput> = z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPhotosInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPhotosInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedCreateWithoutPhotosInputSchema) ]),
}).strict();

export const UserUpsertWithoutPhotosInputSchema: z.ZodType<Prisma.UserUpsertWithoutPhotosInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPhotosInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedCreateWithoutPhotosInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPhotosInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPhotosInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPhotosInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPhotosInputSchema) ]),
}).strict();

export const UserUpdateWithoutPhotosInputSchema: z.ZodType<Prisma.UserUpdateWithoutPhotosInput> = z.object({
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPhotosInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPhotosInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  bubbleSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BubbleHashtagCreateWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagCreateWithoutBubbleInput> = z.object({
  hashtag: z.lazy(() => HashtagCreateNestedOneWithoutEventHashtagsInputSchema)
}).strict();

export const BubbleHashtagUncheckedCreateWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedCreateWithoutBubbleInput> = z.object({
  hashtagId: z.number().int()
}).strict();

export const BubbleHashtagCreateOrConnectWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagCreateOrConnectWithoutBubbleInput> = z.object({
  where: z.lazy(() => BubbleHashtagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema) ]),
}).strict();

export const BubbleHashtagCreateManyBubbleInputEnvelopeSchema: z.ZodType<Prisma.BubbleHashtagCreateManyBubbleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BubbleHashtagCreateManyBubbleInputSchema),z.lazy(() => BubbleHashtagCreateManyBubbleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserBubbleSubscriptionCreateWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateWithoutBubbleInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutBubbleSubscriptionsInputSchema)
}).strict();

export const UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedCreateWithoutBubbleInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number()
}).strict();

export const UserBubbleSubscriptionCreateOrConnectWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateOrConnectWithoutBubbleInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionCreateManyBubbleInputEnvelopeSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyBubbleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserBubbleSubscriptionCreateManyBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionCreateManyBubbleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BubbleHashtagUpsertWithWhereUniqueWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUpsertWithWhereUniqueWithoutBubbleInput> = z.object({
  where: z.lazy(() => BubbleHashtagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BubbleHashtagUpdateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedUpdateWithoutBubbleInputSchema) ]),
  create: z.union([ z.lazy(() => BubbleHashtagCreateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedCreateWithoutBubbleInputSchema) ]),
}).strict();

export const BubbleHashtagUpdateWithWhereUniqueWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateWithWhereUniqueWithoutBubbleInput> = z.object({
  where: z.lazy(() => BubbleHashtagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BubbleHashtagUpdateWithoutBubbleInputSchema),z.lazy(() => BubbleHashtagUncheckedUpdateWithoutBubbleInputSchema) ]),
}).strict();

export const BubbleHashtagUpdateManyWithWhereWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyWithWhereWithoutBubbleInput> = z.object({
  where: z.lazy(() => BubbleHashtagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BubbleHashtagUpdateManyMutationInputSchema),z.lazy(() => BubbleHashtagUncheckedUpdateManyWithoutBubbleInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionUpsertWithWhereUniqueWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpsertWithWhereUniqueWithoutBubbleInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedUpdateWithoutBubbleInputSchema) ]),
  create: z.union([ z.lazy(() => UserBubbleSubscriptionCreateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedCreateWithoutBubbleInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionUpdateWithWhereUniqueWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateWithWhereUniqueWithoutBubbleInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateWithoutBubbleInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedUpdateWithoutBubbleInputSchema) ]),
}).strict();

export const UserBubbleSubscriptionUpdateManyWithWhereWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyWithWhereWithoutBubbleInput> = z.object({
  where: z.lazy(() => UserBubbleSubscriptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserBubbleSubscriptionUpdateManyMutationInputSchema),z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleInputSchema) ]),
}).strict();

export const BubbleCreateWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleCreateWithoutHashtagsInput> = z.object({
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionCreateNestedManyWithoutBubbleInputSchema).optional()
}).strict();

export const BubbleUncheckedCreateWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleUncheckedCreateWithoutHashtagsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedCreateNestedManyWithoutBubbleInputSchema).optional()
}).strict();

export const BubbleCreateOrConnectWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleCreateOrConnectWithoutHashtagsInput> = z.object({
  where: z.lazy(() => BubbleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BubbleCreateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutHashtagsInputSchema) ]),
}).strict();

export const HashtagCreateWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagCreateWithoutEventHashtagsInput> = z.object({
  text: z.string(),
  userHashtags: z.lazy(() => UserHashtagCreateNestedManyWithoutHashtagInputSchema).optional()
}).strict();

export const HashtagUncheckedCreateWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagUncheckedCreateWithoutEventHashtagsInput> = z.object({
  id: z.number().int().optional(),
  text: z.string(),
  userHashtags: z.lazy(() => UserHashtagUncheckedCreateNestedManyWithoutHashtagInputSchema).optional()
}).strict();

export const HashtagCreateOrConnectWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagCreateOrConnectWithoutEventHashtagsInput> = z.object({
  where: z.lazy(() => HashtagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HashtagCreateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutEventHashtagsInputSchema) ]),
}).strict();

export const BubbleUpsertWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleUpsertWithoutHashtagsInput> = z.object({
  update: z.union([ z.lazy(() => BubbleUpdateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedUpdateWithoutHashtagsInputSchema) ]),
  create: z.union([ z.lazy(() => BubbleCreateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutHashtagsInputSchema) ]),
  where: z.lazy(() => BubbleWhereInputSchema).optional()
}).strict();

export const BubbleUpdateToOneWithWhereWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleUpdateToOneWithWhereWithoutHashtagsInput> = z.object({
  where: z.lazy(() => BubbleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BubbleUpdateWithoutHashtagsInputSchema),z.lazy(() => BubbleUncheckedUpdateWithoutHashtagsInputSchema) ]),
}).strict();

export const BubbleUpdateWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleUpdateWithoutHashtagsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionUpdateManyWithoutBubbleNestedInputSchema).optional()
}).strict();

export const BubbleUncheckedUpdateWithoutHashtagsInputSchema: z.ZodType<Prisma.BubbleUncheckedUpdateWithoutHashtagsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userSubscriptions: z.lazy(() => UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleNestedInputSchema).optional()
}).strict();

export const HashtagUpsertWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagUpsertWithoutEventHashtagsInput> = z.object({
  update: z.union([ z.lazy(() => HashtagUpdateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedUpdateWithoutEventHashtagsInputSchema) ]),
  create: z.union([ z.lazy(() => HashtagCreateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedCreateWithoutEventHashtagsInputSchema) ]),
  where: z.lazy(() => HashtagWhereInputSchema).optional()
}).strict();

export const HashtagUpdateToOneWithWhereWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagUpdateToOneWithWhereWithoutEventHashtagsInput> = z.object({
  where: z.lazy(() => HashtagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => HashtagUpdateWithoutEventHashtagsInputSchema),z.lazy(() => HashtagUncheckedUpdateWithoutEventHashtagsInputSchema) ]),
}).strict();

export const HashtagUpdateWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagUpdateWithoutEventHashtagsInput> = z.object({
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userHashtags: z.lazy(() => UserHashtagUpdateManyWithoutHashtagNestedInputSchema).optional()
}).strict();

export const HashtagUncheckedUpdateWithoutEventHashtagsInputSchema: z.ZodType<Prisma.HashtagUncheckedUpdateWithoutEventHashtagsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userHashtags: z.lazy(() => UserHashtagUncheckedUpdateManyWithoutHashtagNestedInputSchema).optional()
}).strict();

export const BubbleCreateWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleCreateWithoutUserSubscriptionsInput> = z.object({
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hashtags: z.lazy(() => BubbleHashtagCreateNestedManyWithoutBubbleInputSchema).optional()
}).strict();

export const BubbleUncheckedCreateWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleUncheckedCreateWithoutUserSubscriptionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  lang: z.lazy(() => BubbleLangSchema),
  type: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hashtags: z.lazy(() => BubbleHashtagUncheckedCreateNestedManyWithoutBubbleInputSchema).optional()
}).strict();

export const BubbleCreateOrConnectWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleCreateOrConnectWithoutUserSubscriptionsInput> = z.object({
  where: z.lazy(() => BubbleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BubbleCreateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutUserSubscriptionsInputSchema) ]),
}).strict();

export const UserCreateWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateWithoutBubbleSubscriptionsInput> = z.object({
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagCreateNestedManyWithoutUserInputSchema).optional(),
  photos: z.lazy(() => UserPhotoCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBubbleSubscriptionsInput> = z.object({
  id: z.number().int().optional(),
  authId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}).optional().nullable(),
  avatar: z.string().optional().nullable(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  personality: z.string(),
  bio: z.string().optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBubbleSubscriptionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBubbleSubscriptionsInputSchema) ]),
}).strict();

export const BubbleUpsertWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleUpsertWithoutUserSubscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => BubbleUpdateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedUpdateWithoutUserSubscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => BubbleCreateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedCreateWithoutUserSubscriptionsInputSchema) ]),
  where: z.lazy(() => BubbleWhereInputSchema).optional()
}).strict();

export const BubbleUpdateToOneWithWhereWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleUpdateToOneWithWhereWithoutUserSubscriptionsInput> = z.object({
  where: z.lazy(() => BubbleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BubbleUpdateWithoutUserSubscriptionsInputSchema),z.lazy(() => BubbleUncheckedUpdateWithoutUserSubscriptionsInputSchema) ]),
}).strict();

export const BubbleUpdateWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleUpdateWithoutUserSubscriptionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hashtags: z.lazy(() => BubbleHashtagUpdateManyWithoutBubbleNestedInputSchema).optional()
}).strict();

export const BubbleUncheckedUpdateWithoutUserSubscriptionsInputSchema: z.ZodType<Prisma.BubbleUncheckedUpdateWithoutUserSubscriptionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lang: z.union([ z.lazy(() => BubbleLangSchema),z.lazy(() => EnumBubbleLangFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hashtags: z.lazy(() => BubbleHashtagUncheckedUpdateManyWithoutBubbleNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBubbleSubscriptionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBubbleSubscriptionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBubbleSubscriptionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBubbleSubscriptionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBubbleSubscriptionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBubbleSubscriptionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBubbleSubscriptionsInput> = z.object({
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUpdateManyWithoutUserNestedInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBubbleSubscriptionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBubbleSubscriptionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  authId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthDate: z.union([ z.string().datetime({message: "Date must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)"}),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personality: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bio: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hashtags: z.lazy(() => UserHashtagUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  photos: z.lazy(() => UserPhotoUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  settings: z.lazy(() => UserSettingsUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const BubbleHashtagCreateManyHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagCreateManyHashtagInput> = z.object({
  bubbleId: z.number().int()
}).strict();

export const UserHashtagCreateManyHashtagInputSchema: z.ZodType<Prisma.UserHashtagCreateManyHashtagInput> = z.object({
  userId: z.number().int(),
  relevance: z.number()
}).strict();

export const BubbleHashtagUpdateWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateWithoutHashtagInput> = z.object({
  bubble: z.lazy(() => BubbleUpdateOneRequiredWithoutHashtagsNestedInputSchema).optional()
}).strict();

export const BubbleHashtagUncheckedUpdateWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateWithoutHashtagInput> = z.object({
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagUncheckedUpdateManyWithoutHashtagInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateManyWithoutHashtagInput> = z.object({
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserHashtagUpdateWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUpdateWithoutHashtagInput> = z.object({
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutHashtagsNestedInputSchema).optional()
}).strict();

export const UserHashtagUncheckedUpdateWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateWithoutHashtagInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserHashtagUncheckedUpdateManyWithoutHashtagInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateManyWithoutHashtagInput> = z.object({
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserHashtagCreateManyUserInputSchema: z.ZodType<Prisma.UserHashtagCreateManyUserInput> = z.object({
  hashtagId: z.number().int(),
  relevance: z.number()
}).strict();

export const UserPhotoCreateManyUserInputSchema: z.ZodType<Prisma.UserPhotoCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  url: z.string(),
  caption: z.string()
}).strict();

export const UserSettingsCreateManyUserInputSchema: z.ZodType<Prisma.UserSettingsCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  key: z.string(),
  value: z.string()
}).strict();

export const UserBubbleSubscriptionCreateManyUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  bubbleId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number()
}).strict();

export const UserHashtagUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUpdateWithoutUserInput> = z.object({
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  hashtag: z.lazy(() => HashtagUpdateOneRequiredWithoutUserHashtagsNestedInputSchema).optional()
}).strict();

export const UserHashtagUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateWithoutUserInput> = z.object({
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserHashtagUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserHashtagUncheckedUpdateManyWithoutUserInput> = z.object({
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  relevance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPhotoUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUpdateWithoutUserInput> = z.object({
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPhotoUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPhotoUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserPhotoUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  caption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserSettingsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUpdateWithoutUserInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserSettingsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserSettingsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserSettingsUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bubble: z.lazy(() => BubbleUpdateOneRequiredWithoutUserSubscriptionsNestedInputSchema).optional()
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bubbleId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagCreateManyBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagCreateManyBubbleInput> = z.object({
  hashtagId: z.number().int()
}).strict();

export const UserBubbleSubscriptionCreateManyBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyBubbleInput> = z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  active: z.boolean(),
  acceptMatches: z.boolean(),
  weight: z.number()
}).strict();

export const BubbleHashtagUpdateWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUpdateWithoutBubbleInput> = z.object({
  hashtag: z.lazy(() => HashtagUpdateOneRequiredWithoutEventHashtagsNestedInputSchema).optional()
}).strict();

export const BubbleHashtagUncheckedUpdateWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateWithoutBubbleInput> = z.object({
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BubbleHashtagUncheckedUpdateManyWithoutBubbleInputSchema: z.ZodType<Prisma.BubbleHashtagUncheckedUpdateManyWithoutBubbleInput> = z.object({
  hashtagId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionUpdateWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateWithoutBubbleInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBubbleSubscriptionsNestedInputSchema).optional()
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateWithoutBubbleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleInputSchema: z.ZodType<Prisma.UserBubbleSubscriptionUncheckedUpdateManyWithoutBubbleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  acceptMatches: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const HashtagFindFirstArgsSchema: z.ZodType<Prisma.HashtagFindFirstArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereInputSchema.optional(),
  orderBy: z.union([ HashtagOrderByWithRelationInputSchema.array(),HashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: HashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HashtagScalarFieldEnumSchema,HashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HashtagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HashtagFindFirstOrThrowArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereInputSchema.optional(),
  orderBy: z.union([ HashtagOrderByWithRelationInputSchema.array(),HashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: HashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HashtagScalarFieldEnumSchema,HashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HashtagFindManyArgsSchema: z.ZodType<Prisma.HashtagFindManyArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereInputSchema.optional(),
  orderBy: z.union([ HashtagOrderByWithRelationInputSchema.array(),HashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: HashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HashtagScalarFieldEnumSchema,HashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HashtagAggregateArgsSchema: z.ZodType<Prisma.HashtagAggregateArgs> = z.object({
  where: HashtagWhereInputSchema.optional(),
  orderBy: z.union([ HashtagOrderByWithRelationInputSchema.array(),HashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: HashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HashtagGroupByArgsSchema: z.ZodType<Prisma.HashtagGroupByArgs> = z.object({
  where: HashtagWhereInputSchema.optional(),
  orderBy: z.union([ HashtagOrderByWithAggregationInputSchema.array(),HashtagOrderByWithAggregationInputSchema ]).optional(),
  by: HashtagScalarFieldEnumSchema.array(),
  having: HashtagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HashtagFindUniqueArgsSchema: z.ZodType<Prisma.HashtagFindUniqueArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereUniqueInputSchema,
}).strict() ;

export const HashtagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HashtagFindUniqueOrThrowArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const UserPlaceholderFindFirstArgsSchema: z.ZodType<Prisma.UserPlaceholderFindFirstArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereInputSchema.optional(),
  orderBy: z.union([ UserPlaceholderOrderByWithRelationInputSchema.array(),UserPlaceholderOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlaceholderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPlaceholderScalarFieldEnumSchema,UserPlaceholderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPlaceholderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserPlaceholderFindFirstOrThrowArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereInputSchema.optional(),
  orderBy: z.union([ UserPlaceholderOrderByWithRelationInputSchema.array(),UserPlaceholderOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlaceholderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPlaceholderScalarFieldEnumSchema,UserPlaceholderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPlaceholderFindManyArgsSchema: z.ZodType<Prisma.UserPlaceholderFindManyArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereInputSchema.optional(),
  orderBy: z.union([ UserPlaceholderOrderByWithRelationInputSchema.array(),UserPlaceholderOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlaceholderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPlaceholderScalarFieldEnumSchema,UserPlaceholderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPlaceholderAggregateArgsSchema: z.ZodType<Prisma.UserPlaceholderAggregateArgs> = z.object({
  where: UserPlaceholderWhereInputSchema.optional(),
  orderBy: z.union([ UserPlaceholderOrderByWithRelationInputSchema.array(),UserPlaceholderOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPlaceholderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPlaceholderGroupByArgsSchema: z.ZodType<Prisma.UserPlaceholderGroupByArgs> = z.object({
  where: UserPlaceholderWhereInputSchema.optional(),
  orderBy: z.union([ UserPlaceholderOrderByWithAggregationInputSchema.array(),UserPlaceholderOrderByWithAggregationInputSchema ]).optional(),
  by: UserPlaceholderScalarFieldEnumSchema.array(),
  having: UserPlaceholderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPlaceholderFindUniqueArgsSchema: z.ZodType<Prisma.UserPlaceholderFindUniqueArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereUniqueInputSchema,
}).strict() ;

export const UserPlaceholderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserPlaceholderFindUniqueOrThrowArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserHashtagFindFirstArgsSchema: z.ZodType<Prisma.UserHashtagFindFirstArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereInputSchema.optional(),
  orderBy: z.union([ UserHashtagOrderByWithRelationInputSchema.array(),UserHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: UserHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserHashtagScalarFieldEnumSchema,UserHashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserHashtagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserHashtagFindFirstOrThrowArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereInputSchema.optional(),
  orderBy: z.union([ UserHashtagOrderByWithRelationInputSchema.array(),UserHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: UserHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserHashtagScalarFieldEnumSchema,UserHashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserHashtagFindManyArgsSchema: z.ZodType<Prisma.UserHashtagFindManyArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereInputSchema.optional(),
  orderBy: z.union([ UserHashtagOrderByWithRelationInputSchema.array(),UserHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: UserHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserHashtagScalarFieldEnumSchema,UserHashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserHashtagAggregateArgsSchema: z.ZodType<Prisma.UserHashtagAggregateArgs> = z.object({
  where: UserHashtagWhereInputSchema.optional(),
  orderBy: z.union([ UserHashtagOrderByWithRelationInputSchema.array(),UserHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: UserHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserHashtagGroupByArgsSchema: z.ZodType<Prisma.UserHashtagGroupByArgs> = z.object({
  where: UserHashtagWhereInputSchema.optional(),
  orderBy: z.union([ UserHashtagOrderByWithAggregationInputSchema.array(),UserHashtagOrderByWithAggregationInputSchema ]).optional(),
  by: UserHashtagScalarFieldEnumSchema.array(),
  having: UserHashtagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserHashtagFindUniqueArgsSchema: z.ZodType<Prisma.UserHashtagFindUniqueArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereUniqueInputSchema,
}).strict() ;

export const UserHashtagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserHashtagFindUniqueOrThrowArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereUniqueInputSchema,
}).strict() ;

export const UserSettingsFindFirstArgsSchema: z.ZodType<Prisma.UserSettingsFindFirstArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereInputSchema.optional(),
  orderBy: z.union([ UserSettingsOrderByWithRelationInputSchema.array(),UserSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserSettingsScalarFieldEnumSchema,UserSettingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserSettingsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserSettingsFindFirstOrThrowArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereInputSchema.optional(),
  orderBy: z.union([ UserSettingsOrderByWithRelationInputSchema.array(),UserSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserSettingsScalarFieldEnumSchema,UserSettingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserSettingsFindManyArgsSchema: z.ZodType<Prisma.UserSettingsFindManyArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereInputSchema.optional(),
  orderBy: z.union([ UserSettingsOrderByWithRelationInputSchema.array(),UserSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserSettingsScalarFieldEnumSchema,UserSettingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserSettingsAggregateArgsSchema: z.ZodType<Prisma.UserSettingsAggregateArgs> = z.object({
  where: UserSettingsWhereInputSchema.optional(),
  orderBy: z.union([ UserSettingsOrderByWithRelationInputSchema.array(),UserSettingsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserSettingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserSettingsGroupByArgsSchema: z.ZodType<Prisma.UserSettingsGroupByArgs> = z.object({
  where: UserSettingsWhereInputSchema.optional(),
  orderBy: z.union([ UserSettingsOrderByWithAggregationInputSchema.array(),UserSettingsOrderByWithAggregationInputSchema ]).optional(),
  by: UserSettingsScalarFieldEnumSchema.array(),
  having: UserSettingsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserSettingsFindUniqueArgsSchema: z.ZodType<Prisma.UserSettingsFindUniqueArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereUniqueInputSchema,
}).strict() ;

export const UserSettingsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserSettingsFindUniqueOrThrowArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereUniqueInputSchema,
}).strict() ;

export const UserPhotoFindFirstArgsSchema: z.ZodType<Prisma.UserPhotoFindFirstArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereInputSchema.optional(),
  orderBy: z.union([ UserPhotoOrderByWithRelationInputSchema.array(),UserPhotoOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPhotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPhotoScalarFieldEnumSchema,UserPhotoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPhotoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserPhotoFindFirstOrThrowArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereInputSchema.optional(),
  orderBy: z.union([ UserPhotoOrderByWithRelationInputSchema.array(),UserPhotoOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPhotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPhotoScalarFieldEnumSchema,UserPhotoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPhotoFindManyArgsSchema: z.ZodType<Prisma.UserPhotoFindManyArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereInputSchema.optional(),
  orderBy: z.union([ UserPhotoOrderByWithRelationInputSchema.array(),UserPhotoOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPhotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPhotoScalarFieldEnumSchema,UserPhotoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPhotoAggregateArgsSchema: z.ZodType<Prisma.UserPhotoAggregateArgs> = z.object({
  where: UserPhotoWhereInputSchema.optional(),
  orderBy: z.union([ UserPhotoOrderByWithRelationInputSchema.array(),UserPhotoOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPhotoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPhotoGroupByArgsSchema: z.ZodType<Prisma.UserPhotoGroupByArgs> = z.object({
  where: UserPhotoWhereInputSchema.optional(),
  orderBy: z.union([ UserPhotoOrderByWithAggregationInputSchema.array(),UserPhotoOrderByWithAggregationInputSchema ]).optional(),
  by: UserPhotoScalarFieldEnumSchema.array(),
  having: UserPhotoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPhotoFindUniqueArgsSchema: z.ZodType<Prisma.UserPhotoFindUniqueArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereUniqueInputSchema,
}).strict() ;

export const UserPhotoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserPhotoFindUniqueOrThrowArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereUniqueInputSchema,
}).strict() ;

export const BubbleFindFirstArgsSchema: z.ZodType<Prisma.BubbleFindFirstArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereInputSchema.optional(),
  orderBy: z.union([ BubbleOrderByWithRelationInputSchema.array(),BubbleOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BubbleScalarFieldEnumSchema,BubbleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BubbleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BubbleFindFirstOrThrowArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereInputSchema.optional(),
  orderBy: z.union([ BubbleOrderByWithRelationInputSchema.array(),BubbleOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BubbleScalarFieldEnumSchema,BubbleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BubbleFindManyArgsSchema: z.ZodType<Prisma.BubbleFindManyArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereInputSchema.optional(),
  orderBy: z.union([ BubbleOrderByWithRelationInputSchema.array(),BubbleOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BubbleScalarFieldEnumSchema,BubbleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BubbleAggregateArgsSchema: z.ZodType<Prisma.BubbleAggregateArgs> = z.object({
  where: BubbleWhereInputSchema.optional(),
  orderBy: z.union([ BubbleOrderByWithRelationInputSchema.array(),BubbleOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BubbleGroupByArgsSchema: z.ZodType<Prisma.BubbleGroupByArgs> = z.object({
  where: BubbleWhereInputSchema.optional(),
  orderBy: z.union([ BubbleOrderByWithAggregationInputSchema.array(),BubbleOrderByWithAggregationInputSchema ]).optional(),
  by: BubbleScalarFieldEnumSchema.array(),
  having: BubbleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BubbleFindUniqueArgsSchema: z.ZodType<Prisma.BubbleFindUniqueArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereUniqueInputSchema,
}).strict() ;

export const BubbleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BubbleFindUniqueOrThrowArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereUniqueInputSchema,
}).strict() ;

export const BubbleHashtagFindFirstArgsSchema: z.ZodType<Prisma.BubbleHashtagFindFirstArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereInputSchema.optional(),
  orderBy: z.union([ BubbleHashtagOrderByWithRelationInputSchema.array(),BubbleHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BubbleHashtagScalarFieldEnumSchema,BubbleHashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BubbleHashtagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BubbleHashtagFindFirstOrThrowArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereInputSchema.optional(),
  orderBy: z.union([ BubbleHashtagOrderByWithRelationInputSchema.array(),BubbleHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BubbleHashtagScalarFieldEnumSchema,BubbleHashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BubbleHashtagFindManyArgsSchema: z.ZodType<Prisma.BubbleHashtagFindManyArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereInputSchema.optional(),
  orderBy: z.union([ BubbleHashtagOrderByWithRelationInputSchema.array(),BubbleHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BubbleHashtagScalarFieldEnumSchema,BubbleHashtagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BubbleHashtagAggregateArgsSchema: z.ZodType<Prisma.BubbleHashtagAggregateArgs> = z.object({
  where: BubbleHashtagWhereInputSchema.optional(),
  orderBy: z.union([ BubbleHashtagOrderByWithRelationInputSchema.array(),BubbleHashtagOrderByWithRelationInputSchema ]).optional(),
  cursor: BubbleHashtagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BubbleHashtagGroupByArgsSchema: z.ZodType<Prisma.BubbleHashtagGroupByArgs> = z.object({
  where: BubbleHashtagWhereInputSchema.optional(),
  orderBy: z.union([ BubbleHashtagOrderByWithAggregationInputSchema.array(),BubbleHashtagOrderByWithAggregationInputSchema ]).optional(),
  by: BubbleHashtagScalarFieldEnumSchema.array(),
  having: BubbleHashtagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BubbleHashtagFindUniqueArgsSchema: z.ZodType<Prisma.BubbleHashtagFindUniqueArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereUniqueInputSchema,
}).strict() ;

export const BubbleHashtagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BubbleHashtagFindUniqueOrThrowArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereUniqueInputSchema,
}).strict() ;

export const UserBubbleSubscriptionFindFirstArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionFindFirstArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBubbleSubscriptionOrderByWithRelationInputSchema.array(),UserBubbleSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBubbleSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserBubbleSubscriptionScalarFieldEnumSchema,UserBubbleSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserBubbleSubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionFindFirstOrThrowArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBubbleSubscriptionOrderByWithRelationInputSchema.array(),UserBubbleSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBubbleSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserBubbleSubscriptionScalarFieldEnumSchema,UserBubbleSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserBubbleSubscriptionFindManyArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionFindManyArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBubbleSubscriptionOrderByWithRelationInputSchema.array(),UserBubbleSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBubbleSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserBubbleSubscriptionScalarFieldEnumSchema,UserBubbleSubscriptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserBubbleSubscriptionAggregateArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionAggregateArgs> = z.object({
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBubbleSubscriptionOrderByWithRelationInputSchema.array(),UserBubbleSubscriptionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserBubbleSubscriptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserBubbleSubscriptionGroupByArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionGroupByArgs> = z.object({
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  orderBy: z.union([ UserBubbleSubscriptionOrderByWithAggregationInputSchema.array(),UserBubbleSubscriptionOrderByWithAggregationInputSchema ]).optional(),
  by: UserBubbleSubscriptionScalarFieldEnumSchema.array(),
  having: UserBubbleSubscriptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserBubbleSubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionFindUniqueArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserBubbleSubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionFindUniqueOrThrowArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const HashtagCreateArgsSchema: z.ZodType<Prisma.HashtagCreateArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  data: z.union([ HashtagCreateInputSchema,HashtagUncheckedCreateInputSchema ]),
}).strict() ;

export const HashtagUpsertArgsSchema: z.ZodType<Prisma.HashtagUpsertArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereUniqueInputSchema,
  create: z.union([ HashtagCreateInputSchema,HashtagUncheckedCreateInputSchema ]),
  update: z.union([ HashtagUpdateInputSchema,HashtagUncheckedUpdateInputSchema ]),
}).strict() ;

export const HashtagCreateManyArgsSchema: z.ZodType<Prisma.HashtagCreateManyArgs> = z.object({
  data: z.union([ HashtagCreateManyInputSchema,HashtagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HashtagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HashtagCreateManyAndReturnArgs> = z.object({
  data: z.union([ HashtagCreateManyInputSchema,HashtagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HashtagDeleteArgsSchema: z.ZodType<Prisma.HashtagDeleteArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  where: HashtagWhereUniqueInputSchema,
}).strict() ;

export const HashtagUpdateArgsSchema: z.ZodType<Prisma.HashtagUpdateArgs> = z.object({
  select: HashtagSelectSchema.optional(),
  include: HashtagIncludeSchema.optional(),
  data: z.union([ HashtagUpdateInputSchema,HashtagUncheckedUpdateInputSchema ]),
  where: HashtagWhereUniqueInputSchema,
}).strict() ;

export const HashtagUpdateManyArgsSchema: z.ZodType<Prisma.HashtagUpdateManyArgs> = z.object({
  data: z.union([ HashtagUpdateManyMutationInputSchema,HashtagUncheckedUpdateManyInputSchema ]),
  where: HashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HashtagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HashtagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ HashtagUpdateManyMutationInputSchema,HashtagUncheckedUpdateManyInputSchema ]),
  where: HashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HashtagDeleteManyArgsSchema: z.ZodType<Prisma.HashtagDeleteManyArgs> = z.object({
  where: HashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPlaceholderCreateArgsSchema: z.ZodType<Prisma.UserPlaceholderCreateArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  data: z.union([ UserPlaceholderCreateInputSchema,UserPlaceholderUncheckedCreateInputSchema ]),
}).strict() ;

export const UserPlaceholderUpsertArgsSchema: z.ZodType<Prisma.UserPlaceholderUpsertArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereUniqueInputSchema,
  create: z.union([ UserPlaceholderCreateInputSchema,UserPlaceholderUncheckedCreateInputSchema ]),
  update: z.union([ UserPlaceholderUpdateInputSchema,UserPlaceholderUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserPlaceholderCreateManyArgsSchema: z.ZodType<Prisma.UserPlaceholderCreateManyArgs> = z.object({
  data: z.union([ UserPlaceholderCreateManyInputSchema,UserPlaceholderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPlaceholderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserPlaceholderCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserPlaceholderCreateManyInputSchema,UserPlaceholderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPlaceholderDeleteArgsSchema: z.ZodType<Prisma.UserPlaceholderDeleteArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  where: UserPlaceholderWhereUniqueInputSchema,
}).strict() ;

export const UserPlaceholderUpdateArgsSchema: z.ZodType<Prisma.UserPlaceholderUpdateArgs> = z.object({
  select: UserPlaceholderSelectSchema.optional(),
  data: z.union([ UserPlaceholderUpdateInputSchema,UserPlaceholderUncheckedUpdateInputSchema ]),
  where: UserPlaceholderWhereUniqueInputSchema,
}).strict() ;

export const UserPlaceholderUpdateManyArgsSchema: z.ZodType<Prisma.UserPlaceholderUpdateManyArgs> = z.object({
  data: z.union([ UserPlaceholderUpdateManyMutationInputSchema,UserPlaceholderUncheckedUpdateManyInputSchema ]),
  where: UserPlaceholderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPlaceholderUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserPlaceholderUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserPlaceholderUpdateManyMutationInputSchema,UserPlaceholderUncheckedUpdateManyInputSchema ]),
  where: UserPlaceholderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPlaceholderDeleteManyArgsSchema: z.ZodType<Prisma.UserPlaceholderDeleteManyArgs> = z.object({
  where: UserPlaceholderWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserHashtagCreateArgsSchema: z.ZodType<Prisma.UserHashtagCreateArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  data: z.union([ UserHashtagCreateInputSchema,UserHashtagUncheckedCreateInputSchema ]),
}).strict() ;

export const UserHashtagUpsertArgsSchema: z.ZodType<Prisma.UserHashtagUpsertArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereUniqueInputSchema,
  create: z.union([ UserHashtagCreateInputSchema,UserHashtagUncheckedCreateInputSchema ]),
  update: z.union([ UserHashtagUpdateInputSchema,UserHashtagUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserHashtagCreateManyArgsSchema: z.ZodType<Prisma.UserHashtagCreateManyArgs> = z.object({
  data: z.union([ UserHashtagCreateManyInputSchema,UserHashtagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserHashtagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserHashtagCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserHashtagCreateManyInputSchema,UserHashtagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserHashtagDeleteArgsSchema: z.ZodType<Prisma.UserHashtagDeleteArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  where: UserHashtagWhereUniqueInputSchema,
}).strict() ;

export const UserHashtagUpdateArgsSchema: z.ZodType<Prisma.UserHashtagUpdateArgs> = z.object({
  select: UserHashtagSelectSchema.optional(),
  include: UserHashtagIncludeSchema.optional(),
  data: z.union([ UserHashtagUpdateInputSchema,UserHashtagUncheckedUpdateInputSchema ]),
  where: UserHashtagWhereUniqueInputSchema,
}).strict() ;

export const UserHashtagUpdateManyArgsSchema: z.ZodType<Prisma.UserHashtagUpdateManyArgs> = z.object({
  data: z.union([ UserHashtagUpdateManyMutationInputSchema,UserHashtagUncheckedUpdateManyInputSchema ]),
  where: UserHashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserHashtagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserHashtagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserHashtagUpdateManyMutationInputSchema,UserHashtagUncheckedUpdateManyInputSchema ]),
  where: UserHashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserHashtagDeleteManyArgsSchema: z.ZodType<Prisma.UserHashtagDeleteManyArgs> = z.object({
  where: UserHashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserSettingsCreateArgsSchema: z.ZodType<Prisma.UserSettingsCreateArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  data: z.union([ UserSettingsCreateInputSchema,UserSettingsUncheckedCreateInputSchema ]),
}).strict() ;

export const UserSettingsUpsertArgsSchema: z.ZodType<Prisma.UserSettingsUpsertArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereUniqueInputSchema,
  create: z.union([ UserSettingsCreateInputSchema,UserSettingsUncheckedCreateInputSchema ]),
  update: z.union([ UserSettingsUpdateInputSchema,UserSettingsUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserSettingsCreateManyArgsSchema: z.ZodType<Prisma.UserSettingsCreateManyArgs> = z.object({
  data: z.union([ UserSettingsCreateManyInputSchema,UserSettingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserSettingsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserSettingsCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserSettingsCreateManyInputSchema,UserSettingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserSettingsDeleteArgsSchema: z.ZodType<Prisma.UserSettingsDeleteArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  where: UserSettingsWhereUniqueInputSchema,
}).strict() ;

export const UserSettingsUpdateArgsSchema: z.ZodType<Prisma.UserSettingsUpdateArgs> = z.object({
  select: UserSettingsSelectSchema.optional(),
  include: UserSettingsIncludeSchema.optional(),
  data: z.union([ UserSettingsUpdateInputSchema,UserSettingsUncheckedUpdateInputSchema ]),
  where: UserSettingsWhereUniqueInputSchema,
}).strict() ;

export const UserSettingsUpdateManyArgsSchema: z.ZodType<Prisma.UserSettingsUpdateManyArgs> = z.object({
  data: z.union([ UserSettingsUpdateManyMutationInputSchema,UserSettingsUncheckedUpdateManyInputSchema ]),
  where: UserSettingsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserSettingsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserSettingsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserSettingsUpdateManyMutationInputSchema,UserSettingsUncheckedUpdateManyInputSchema ]),
  where: UserSettingsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserSettingsDeleteManyArgsSchema: z.ZodType<Prisma.UserSettingsDeleteManyArgs> = z.object({
  where: UserSettingsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPhotoCreateArgsSchema: z.ZodType<Prisma.UserPhotoCreateArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  data: z.union([ UserPhotoCreateInputSchema,UserPhotoUncheckedCreateInputSchema ]),
}).strict() ;

export const UserPhotoUpsertArgsSchema: z.ZodType<Prisma.UserPhotoUpsertArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereUniqueInputSchema,
  create: z.union([ UserPhotoCreateInputSchema,UserPhotoUncheckedCreateInputSchema ]),
  update: z.union([ UserPhotoUpdateInputSchema,UserPhotoUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserPhotoCreateManyArgsSchema: z.ZodType<Prisma.UserPhotoCreateManyArgs> = z.object({
  data: z.union([ UserPhotoCreateManyInputSchema,UserPhotoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPhotoCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserPhotoCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserPhotoCreateManyInputSchema,UserPhotoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPhotoDeleteArgsSchema: z.ZodType<Prisma.UserPhotoDeleteArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  where: UserPhotoWhereUniqueInputSchema,
}).strict() ;

export const UserPhotoUpdateArgsSchema: z.ZodType<Prisma.UserPhotoUpdateArgs> = z.object({
  select: UserPhotoSelectSchema.optional(),
  include: UserPhotoIncludeSchema.optional(),
  data: z.union([ UserPhotoUpdateInputSchema,UserPhotoUncheckedUpdateInputSchema ]),
  where: UserPhotoWhereUniqueInputSchema,
}).strict() ;

export const UserPhotoUpdateManyArgsSchema: z.ZodType<Prisma.UserPhotoUpdateManyArgs> = z.object({
  data: z.union([ UserPhotoUpdateManyMutationInputSchema,UserPhotoUncheckedUpdateManyInputSchema ]),
  where: UserPhotoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPhotoUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserPhotoUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserPhotoUpdateManyMutationInputSchema,UserPhotoUncheckedUpdateManyInputSchema ]),
  where: UserPhotoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPhotoDeleteManyArgsSchema: z.ZodType<Prisma.UserPhotoDeleteManyArgs> = z.object({
  where: UserPhotoWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BubbleCreateArgsSchema: z.ZodType<Prisma.BubbleCreateArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  data: z.union([ BubbleCreateInputSchema,BubbleUncheckedCreateInputSchema ]),
}).strict() ;

export const BubbleUpsertArgsSchema: z.ZodType<Prisma.BubbleUpsertArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereUniqueInputSchema,
  create: z.union([ BubbleCreateInputSchema,BubbleUncheckedCreateInputSchema ]),
  update: z.union([ BubbleUpdateInputSchema,BubbleUncheckedUpdateInputSchema ]),
}).strict() ;

export const BubbleCreateManyArgsSchema: z.ZodType<Prisma.BubbleCreateManyArgs> = z.object({
  data: z.union([ BubbleCreateManyInputSchema,BubbleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BubbleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BubbleCreateManyAndReturnArgs> = z.object({
  data: z.union([ BubbleCreateManyInputSchema,BubbleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BubbleDeleteArgsSchema: z.ZodType<Prisma.BubbleDeleteArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  where: BubbleWhereUniqueInputSchema,
}).strict() ;

export const BubbleUpdateArgsSchema: z.ZodType<Prisma.BubbleUpdateArgs> = z.object({
  select: BubbleSelectSchema.optional(),
  include: BubbleIncludeSchema.optional(),
  data: z.union([ BubbleUpdateInputSchema,BubbleUncheckedUpdateInputSchema ]),
  where: BubbleWhereUniqueInputSchema,
}).strict() ;

export const BubbleUpdateManyArgsSchema: z.ZodType<Prisma.BubbleUpdateManyArgs> = z.object({
  data: z.union([ BubbleUpdateManyMutationInputSchema,BubbleUncheckedUpdateManyInputSchema ]),
  where: BubbleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BubbleUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BubbleUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BubbleUpdateManyMutationInputSchema,BubbleUncheckedUpdateManyInputSchema ]),
  where: BubbleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BubbleDeleteManyArgsSchema: z.ZodType<Prisma.BubbleDeleteManyArgs> = z.object({
  where: BubbleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BubbleHashtagCreateArgsSchema: z.ZodType<Prisma.BubbleHashtagCreateArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  data: z.union([ BubbleHashtagCreateInputSchema,BubbleHashtagUncheckedCreateInputSchema ]),
}).strict() ;

export const BubbleHashtagUpsertArgsSchema: z.ZodType<Prisma.BubbleHashtagUpsertArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereUniqueInputSchema,
  create: z.union([ BubbleHashtagCreateInputSchema,BubbleHashtagUncheckedCreateInputSchema ]),
  update: z.union([ BubbleHashtagUpdateInputSchema,BubbleHashtagUncheckedUpdateInputSchema ]),
}).strict() ;

export const BubbleHashtagCreateManyArgsSchema: z.ZodType<Prisma.BubbleHashtagCreateManyArgs> = z.object({
  data: z.union([ BubbleHashtagCreateManyInputSchema,BubbleHashtagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BubbleHashtagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BubbleHashtagCreateManyAndReturnArgs> = z.object({
  data: z.union([ BubbleHashtagCreateManyInputSchema,BubbleHashtagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BubbleHashtagDeleteArgsSchema: z.ZodType<Prisma.BubbleHashtagDeleteArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  where: BubbleHashtagWhereUniqueInputSchema,
}).strict() ;

export const BubbleHashtagUpdateArgsSchema: z.ZodType<Prisma.BubbleHashtagUpdateArgs> = z.object({
  select: BubbleHashtagSelectSchema.optional(),
  include: BubbleHashtagIncludeSchema.optional(),
  data: z.union([ BubbleHashtagUpdateInputSchema,BubbleHashtagUncheckedUpdateInputSchema ]),
  where: BubbleHashtagWhereUniqueInputSchema,
}).strict() ;

export const BubbleHashtagUpdateManyArgsSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyArgs> = z.object({
  data: z.union([ BubbleHashtagUpdateManyMutationInputSchema,BubbleHashtagUncheckedUpdateManyInputSchema ]),
  where: BubbleHashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BubbleHashtagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.BubbleHashtagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ BubbleHashtagUpdateManyMutationInputSchema,BubbleHashtagUncheckedUpdateManyInputSchema ]),
  where: BubbleHashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const BubbleHashtagDeleteManyArgsSchema: z.ZodType<Prisma.BubbleHashtagDeleteManyArgs> = z.object({
  where: BubbleHashtagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserBubbleSubscriptionCreateArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  data: z.union([ UserBubbleSubscriptionCreateInputSchema,UserBubbleSubscriptionUncheckedCreateInputSchema ]),
}).strict() ;

export const UserBubbleSubscriptionUpsertArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpsertArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereUniqueInputSchema,
  create: z.union([ UserBubbleSubscriptionCreateInputSchema,UserBubbleSubscriptionUncheckedCreateInputSchema ]),
  update: z.union([ UserBubbleSubscriptionUpdateInputSchema,UserBubbleSubscriptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserBubbleSubscriptionCreateManyArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyArgs> = z.object({
  data: z.union([ UserBubbleSubscriptionCreateManyInputSchema,UserBubbleSubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserBubbleSubscriptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserBubbleSubscriptionCreateManyInputSchema,UserBubbleSubscriptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserBubbleSubscriptionDeleteArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionDeleteArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  where: UserBubbleSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserBubbleSubscriptionUpdateArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateArgs> = z.object({
  select: UserBubbleSubscriptionSelectSchema.optional(),
  include: UserBubbleSubscriptionIncludeSchema.optional(),
  data: z.union([ UserBubbleSubscriptionUpdateInputSchema,UserBubbleSubscriptionUncheckedUpdateInputSchema ]),
  where: UserBubbleSubscriptionWhereUniqueInputSchema,
}).strict() ;

export const UserBubbleSubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyArgs> = z.object({
  data: z.union([ UserBubbleSubscriptionUpdateManyMutationInputSchema,UserBubbleSubscriptionUncheckedUpdateManyInputSchema ]),
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserBubbleSubscriptionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserBubbleSubscriptionUpdateManyMutationInputSchema,UserBubbleSubscriptionUncheckedUpdateManyInputSchema ]),
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserBubbleSubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.UserBubbleSubscriptionDeleteManyArgs> = z.object({
  where: UserBubbleSubscriptionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;