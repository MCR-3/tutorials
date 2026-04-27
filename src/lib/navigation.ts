export type Article = {
  title: string;
  slug: string;
  description?: string;
};

export type Topic = {
  title: string;
  slug: string;
  articles: Article[];
};

export const navigation: Topic[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    articles: [
      {
        title: "Introduction",
        slug: "introduction",
        description:
          "What these tutorials are about, what you'll learn, and what you need to get started.",
      },
    ],
  },
  {
    title: "Math Foundations",
    slug: "math-foundations",
    articles: [
      {
        title: "Vectors & Dot Product",
        slug: "vectors-and-dot-product",
        description: "The geometry of deep learning.",
      },
      {
        title: "Matrices",
        slug: "matrices",
        description: "Transforming space and processing batches.",
      },
      {
        title: "Derivatives",
        slug: "derivatives",
        description: "The instantaneous rate of change, and why it matters.",
      },
      {
        title: "Gradients",
        slug: "gradients",
        description: "Derivatives in multiple directions — the slope of a surface.",
      },
    ],
  },
  {
    title: "Autograd",
    slug: "autograd",
    articles: [
      {
        title: "The Chain Rule",
        slug: "chain-rule",
        description:
          "The one formula that makes all of deep learning possible.",
      },
      {
        title: "The Computation Graph",
        slug: "computation-graph",
        description: "How simplegrad tracks operations automatically.",
      },
      {
        title: "Backpropagation",
        slug: "backpropagation",
        description: "Traversing the graph to compute every gradient at once.",
      },
    ],
  },
  {
    title: "Training",
    slug: "training",
    articles: [
      {
        title: "Loss Functions",
        slug: "loss-functions",
        description: "Measuring how wrong a model is — MSE and cross-entropy.",
      },
      {
        title: "Gradient Descent",
        slug: "gradient-descent",
        description: "Using the gradient to nudge parameters in the right direction.",
      },
      {
        title: "Optimizers",
        slug: "optimizers",
        description: "From SGD to Momentum to Adam — making training faster.",
      },
      {
        title: "The Training Loop",
        slug: "training-loop",
        description: "Batches, epochs, validation — the full cycle of learning.",
      },
    ],
  },
  {
    title: "Building Blocks",
    slug: "building-blocks",
    articles: [
      {
        title: "Activation Functions",
        slug: "activation-functions",
        description: "ReLU, sigmoid, tanh — adding non-linearity to the network.",
      },
      {
        title: "Linear Layers",
        slug: "linear-layers",
        description: "What a neuron actually computes, and how to stack them.",
      },
      {
        title: "Regularization",
        slug: "regularization",
        description: "Dropout and batch normalization — keeping the network honest.",
      },
    ],
  },
  {
    title: "Convolutional Networks",
    slug: "convolutional-networks",
    articles: [
      {
        title: "Kernels & Filters",
        slug: "kernels-and-filters",
        description: "Understanding feature detection in images.",
      },
      {
        title: "Downsampling",
        slug: "downsampling",
        description: "Pooling and strides for spatial hierarchy.",
      },
      {
        title: "Convolution Optimization",
        slug: "convolution-optimization",
        description: "How im2col makes convolutions blazing fast on CPUs.",
      },
      {
        title: "Digit Classifier",
        slug: "digit-classifier",
        description: "Building a CNN to recognize handwritten digits.",
      },
    ],
  },
  {
    title: "Recurrent Networks",
    slug: "recurrent-networks",
    articles: [
      {
        title: "Sequences & Memory",
        slug: "sequences-and-memory",
        description: "Why order matters, and what it means to remember.",
      },
      {
        title: "Vanilla RNNs",
        slug: "rnns",
        description: "Passing a hidden state through time — step by step.",
      },
      {
        title: "LSTMs & GRUs",
        slug: "lstms-and-grus",
        description: "Gating mechanisms that fix the vanishing gradient problem.",
      },
      {
        title: "The Limits of RNNs",
        slug: "beyond-rnns",
        description: "Why sequential processing breaks down at scale.",
      },
    ],
  },
  {
    title: "Transformers",
    slug: "transformers",
    articles: [
      {
        title: "Tokenization & Embeddings",
        slug: "tokenization-and-embeddings",
        description: "Turning words into vectors the network can work with.",
      },
      {
        title: "Positional Encoding",
        slug: "positional-encoding",
        description: "Injecting word order into an order-agnostic architecture.",
      },
      {
        title: "Attention Mechanism",
        slug: "attention",
        description: "Query, Key, and Value: the library analogy.",
      },
      {
        title: "Multi-Head Attention",
        slug: "multi-head-attention",
        description: "Learning different perspectives in parallel.",
      },
      {
        title: "The Transformer Block",
        slug: "transformer-block",
        description: "LayerNorm, feed-forward layers, and residual connections.",
      },
      {
        title: "GPT-2 from Scratch",
        slug: "gpt2",
        description: "Assembling every piece into a working language model.",
      },
    ],
  },
];

export function getAllArticleParams(): { category: string; slug: string }[] {
  return navigation.flatMap((topic) =>
    topic.articles.map((a) => ({ category: topic.slug, slug: a.slug }))
  );
}

export function getArticlePath(slug: string): string {
  for (const topic of navigation) {
    for (const article of topic.articles) {
      if (article.slug === slug) {
        return `/${topic.slug}/${article.slug}`;
      }
    }
  }
  return `/`;
}

export function findArticle(slug: string): Article | undefined {
  return navigation.flatMap((t) => t.articles).find((a) => a.slug === slug);
}
