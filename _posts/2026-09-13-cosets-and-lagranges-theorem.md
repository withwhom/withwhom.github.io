---
layout: scrap
title: "Cosets and Lagrange's theorem"
date: 2026-09-13
tags: [group theory]
source: "Fraleigh §10"
---

Reading notes on Fraleigh §10. Why the partition argument works, and what breaks for infinite groups.

<div class="thm">
<span class="thm-head">Theorem 1 (Lagrange).</span>
<span class="thm-body">Let \(G\) be a finite group and let \(H \leq G\) be a subgroup.
Then \(|H|\) divides \(|G|\).</span>
</div>

<div class="proof">
<span class="proof-head">Proof sketch.</span>
The left cosets of \(H\) partition \(G\), and each coset \(gH\) has exactly \(|H|\)
elements, since \(h \mapsto gh\) is a bijection \(H \to gH\). Writing \([G:H]\) for
the number of cosets,
$$|G| = [G : H]\,|H|.$$
<span class="qed">\(\blacksquare\)</span>
</div>

An immediate corollary: the order of every element of $$G$$ divides $$\lvert G \rvert$$, because
$$\langle g \rangle$$ is a subgroup of order $$\operatorname{ord}(g)$$.

## Why the partition works

Two facts do all the work. First, $$gH = g'H$$ exactly when $$g^{-1}g' \in H$$, so
"lies in the same left coset" is an equivalence relation on $$G$$. Second, the cosets
all have the same size, and that size is $$\lvert H \rvert$$. Neither fact uses finiteness; only
the final counting step does.

## What breaks for infinite groups

The partition into cosets still exists, and every coset is still in bijection with
$$H$$. What no longer makes sense is the *equation* $$\lvert G \rvert = [G:H]\,\lvert H \rvert$$ as a
statement about integers. Take $$G = \mathbb{Z}$$ and $$H = 2\mathbb{Z}$$: the index
is $$2$$, but "$$\lvert H \rvert$$ divides $$\lvert G \rvert$$" is meaningless. What survives is the
statement about indices: if $$K \leq H \leq G$$ then

$$
[G : K] = [G : H]\,[H : K],
$$

interpreted as cardinal arithmetic when the indices are infinite.
