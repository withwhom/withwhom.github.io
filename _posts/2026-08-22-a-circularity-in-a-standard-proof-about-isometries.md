---
layout: scrap
title: "A circularity in a standard proof about isometries"
date: 2026-08-22
tags: [linear algebra]
---

A textbook proof that origin-fixing isometries are linear turns out to assume what it proves. Two ways to fix it.

## The claim

Let $$f : \mathbb{R}^n \to \mathbb{R}^n$$ be an isometry, $$\lVert f(x) - f(y) \rVert = \lVert x - y \rVert$$
for all $$x, y$$, with $$f(0) = 0$$. Then $$f$$ is linear.

## The proof as written

1. Since $$f(0) = 0$$, we get $$\lVert f(x) \rVert = \lVert x \rVert$$.
2. By polarization, $$\langle f(x), f(y) \rangle = \langle x, y \rangle$$.
3. Let $$e_1, \dots, e_n$$ be an orthonormal basis. Then $$f(e_1), \dots, f(e_n)$$ is
   orthonormal, so $$f(x) = \sum_i \langle f(x), f(e_i) \rangle f(e_i) = \sum_i \langle x, e_i \rangle f(e_i)$$,
   which is linear in $$x$$.

The gap is in step 3. Writing $$f(x)$$ as a combination of the $$f(e_i)$$ needs them
to *span*, and the text justifies that by saying the image of a basis under $$f$$ is a
basis. That is true for linear maps, which is the thing being proved.

## Fix one: count

In $$\mathbb{R}^n$$ any $$n$$ orthonormal vectors are linearly independent, hence a
basis. So spanning comes for free from dimension, no linearity needed. This is why
the proof "works" in finite dimensions even though the stated justification is circular.

## Fix two: expand the norm

Avoid bases altogether. Using step 2,

$$
\lVert f(x+y) - f(x) - f(y) \rVert^2
= \lVert x + y \rVert^2 + \lVert x \rVert^2 + \lVert y \rVert^2
  - 2\langle x+y, x \rangle - 2\langle x+y, y \rangle + 2\langle x, y \rangle = 0,
$$

and the same computation gives $$\lVert f(cx) - c f(x) \rVert^2 = 0$$. This version
also survives in infinite-dimensional inner product spaces, where fix one does not.
