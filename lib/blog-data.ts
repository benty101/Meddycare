/**
 * Blog data structure and helpers
 * This will be replaced with CMS/database integration in the future
 */

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: BlogCategory;
    tags: string[];
    author: Author;
    date: string;
    image: string;
    readTime: string;
    featured?: boolean;
}

export interface Author {
    name: string;
    avatar?: string;
    bio?: string;
    role?: string;
}

export type BlogCategory =
    | "Dementia Care"
    | "Care Guides"
    | "Safety"
    | "Health & Wellness"
    | "Mental Health"
    | "Finance"
    | "Platform Updates";

export const BLOG_CATEGORIES: BlogCategory[] = [
    "Dementia Care",
    "Care Guides",
    "Safety",
    "Health & Wellness",
    "Mental Health",
    "Finance",
    "Platform Updates"
];

export const AUTHORS: Record<string, Author> = {
    "dr-sarah-miller": {
        name: "Dr. Sarah Miller",
        role: "Medical Advisor",
        bio: "Dr. Sarah Miller is a geriatric specialist with over 15 years of experience in elderly care and dementia treatment."
    },
    "james-wilson": {
        name: "James Wilson",
        role: "Care Expert",
        bio: "James has been working in the care industry for over a decade, specializing in live-in care coordination."
    },
    "emma-thompson": {
        name: "Emma Thompson",
        role: "Safety Consultant",
        bio: "Emma is a certified safety consultant focusing on home modifications and fall prevention for seniors."
    }
};

// Sample blog posts - will be replaced with database/CMS
export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Understanding the Stages of Dementia",
        slug: "understanding-stages-of-dementia",
        excerpt: "A comprehensive guide to recognizing the early signs of dementia and how care needs evolve over time.",
        content: `# Understanding the Stages of Dementia

Dementia is a progressive condition that affects millions of people worldwide. Understanding the different stages can help families prepare and provide appropriate care.

## Early Stage Dementia

In the early stages, individuals may experience:
- Memory lapses
- Difficulty finding words
- Mild confusion
- Challenges with planning

## Middle Stage Dementia

As the condition progresses:
- Memory problems become more pronounced
- Increased confusion and disorientation
- Need for assistance with daily activities
- Behavioral changes

## Late Stage Dementia

In the final stages:
- Severe memory loss
- Physical frailty
- Need for 24/7 care
- Loss of communication abilities

## Getting Support

If you're caring for someone with dementia, live-in care can provide the continuous support they need while allowing them to remain in familiar surroundings.`,
        category: "Dementia Care",
        tags: ["dementia", "alzheimers", "care-planning", "symptoms"],
        author: AUTHORS["dr-sarah-miller"],
        date: "Nov 20, 2024",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        readTime: "8 min read",
        featured: true
    },
    {
        id: 2,
        title: "Live-in Care vs. Care Homes: Making the Right Choice",
        slug: "live-in-care-vs-care-homes",
        excerpt: "Comparing the costs, benefits, and lifestyle differences to help you make an informed decision for your loved one.",
        content: `# Live-in Care vs. Care Homes: Making the Right Choice

Choosing between live-in care and a care home is one of the most important decisions families face. This guide will help you understand the key differences.

## Cost Comparison

**Live-in Care**: From £950/week
- One-to-one attention
- No hidden fees
- Flexible arrangements

**Care Homes**: From £1,200/week
- Shared facilities
- Additional costs for extras
- Fixed schedules

## Quality of Life

### Live-in Care Benefits:
- Stay in familiar surroundings
- Keep beloved pets
- Maintain routines
- Couples stay together

### Care Home Benefits:
- Social activities
- On-site medical support
- 24/7 staffing

## Making Your Decision

Consider your loved one's needs, preferences, and budget when making this important choice.`,
        category: "Care Guides",
        tags: ["live-in-care", "care-homes", "decision-making", "costs"],
        author: AUTHORS["james-wilson"],
        date: "Nov 18, 2024",
        image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop",
        readTime: "6 min read"
    },
    {
        id: 3,
        title: "5 Tips for Preventing Falls at Home",
        slug: "preventing-falls-at-home",
        excerpt: "Practical modifications and daily habits that can significantly reduce the risk of falls for seniors living independently.",
        content: `# 5 Tips for Preventing Falls at Home

Falls are a leading cause of injury among seniors. Here are practical steps to create a safer home environment.

## 1. Remove Tripping Hazards

- Clear walkways
- Secure loose rugs
- Remove clutter

## 2. Improve Lighting

- Install brighter bulbs
- Add nightlights
- Ensure switches are accessible

## 3. Install Grab Bars

- Bathroom grab bars
- Stair handrails
- Bedroom support

## 4. Review Medications

Some medications can cause dizziness. Consult with your doctor about potential side effects.

## 5. Stay Active

Regular exercise improves balance and strength, reducing fall risk.`,
        category: "Safety",
        tags: ["safety", "falls-prevention", "home-modifications", "elderly-care"],
        author: AUTHORS["emma-thompson"],
        date: "Nov 15, 2024",
        image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=2060&auto=format&fit=crop",
        readTime: "5 min read"
    },
    {
        id: 4,
        title: "Nutrition Guide for Seniors",
        slug: "nutrition-guide-for-seniors",
        excerpt: "How to maintain a healthy, balanced diet that supports immunity and energy levels in later life.",
        content: `# Nutrition Guide for Seniors

Proper nutrition is essential for healthy aging. This guide covers key nutritional needs for seniors.

## Essential Nutrients

### Protein
- Maintains muscle mass
- Supports immune function
- Sources: Lean meats, fish, beans

### Calcium & Vitamin D
- Bone health
- Fall prevention
- Sources: Dairy, fortified foods

### Fiber
- Digestive health
- Heart health
- Sources: Whole grains, fruits, vegetables

## Hydration

Seniors often don't feel thirsty. Aim for 6-8 glasses of water daily.

## Meal Planning Tips

- Eat smaller, frequent meals
- Include variety
- Make meals social
- Consider supplements if needed`,
        category: "Health & Wellness",
        tags: ["nutrition", "diet", "health", "aging"],
        author: AUTHORS["dr-sarah-miller"],
        date: "Nov 12, 2024",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
        readTime: "7 min read"
    },
    {
        id: 5,
        title: "The Benefits of Companionship Care",
        slug: "benefits-of-companionship-care",
        excerpt: "Why social interaction is crucial for mental health and how a companion carer can brighten daily life.",
        content: `# The Benefits of Companionship Care

Loneliness can have serious health impacts on seniors. Companionship care provides vital social interaction.

## What is Companionship Care?

Companionship care focuses on:
- Social interaction
- Emotional support
- Light assistance
- Activity engagement

## Mental Health Benefits

- Reduces depression
- Improves cognitive function
- Enhances quality of life
- Provides emotional support

## Activities Companion Carers Can Help With

- Conversation and storytelling
- Games and hobbies
- Walks and outings
- Meal preparation and sharing
- Technology assistance

## Is Companionship Care Right for You?

If your loved one is relatively independent but lonely or isolated, companionship care can make a significant difference.`,
        category: "Mental Health",
        tags: ["companionship", "loneliness", "mental-health", "social-care"],
        author: AUTHORS["james-wilson"],
        date: "Nov 10, 2024",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
        readTime: "4 min read"
    },
    {
        id: 6,
        title: "Navigating Care Funding in the UK",
        slug: "navigating-care-funding-uk",
        excerpt: "A breakdown of available financial support, including Attendance Allowance and NHS Continuing Healthcare.",
        content: `# Navigating Care Funding in the UK

Understanding care funding options can help you plan financially for care needs.

## Self-Funding

If you have savings over £23,250, you'll likely need to self-fund care.

## Attendance Allowance

- For those over 65
- Tax-free benefit
- Doesn't depend on income
- £72.65 - £108.55 per week

## NHS Continuing Healthcare

Free care for those with complex medical needs. Apply through your local NHS.

## Local Authority Support

If your savings are under £23,250, your local council may contribute to care costs.

## Deferred Payment Agreements

Allows you to use your home's value to pay for care without selling immediately.

## Planning Ahead

Start exploring funding options early to understand what support you're entitled to.`,
        category: "Finance",
        tags: ["funding", "benefits", "NHS", "financial-planning"],
        author: AUTHORS["emma-thompson"],
        date: "Nov 05, 2024",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop",
        readTime: "10 min read"
    }
];

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find(post => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
    return BLOG_POSTS.filter(post => post.category === category);
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
    // Get posts with matching tags or same category
    const related = BLOG_POSTS.filter(post => {
        if (post.id === currentPost.id) return false;

        // Check for tag matches
        const hasMatchingTag = post.tags.some(tag => currentPost.tags.includes(tag));
        const sameCategory = post.category === currentPost.category;

        return hasMatchingTag || sameCategory;
    });

    return related.slice(0, limit);
}

export function getFeaturedPost(): BlogPost | undefined {
    return BLOG_POSTS.find(post => post.featured);
}

export function getAllPosts(): BlogPost[] {
    return BLOG_POSTS;
}
