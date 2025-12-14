export interface Post {
    _id: string
    _createdAt: string
    title: string
    slug: { current: string }
    body: [object]
    mainImage: {
        asset: { url: string }
    }
    author: {
        name: string
        image: {
            asset: { url: string }
        }
    }
}