---
layout: scrap
title: "Average of A^{1/x} over [1, A]"
date: 2026-11-16
tags: [analysis, asymptotics]
---

At $$x=1$$ the integrand $$A^{1/x}=A$$ is enormous, so my first guess was that
$$\int_1^A A^{1/x}\,dx$$ should dwarf $$A$$ and the average should blow up. It
doesn't — the average tends to $$1$$. The whole problem is explaining why the
huge value near $$x=1$$ contributes nothing in the limit.

Write $$c=\ln A$$, so $$A^{1/x}=e^{c/x}$$ on $$[1,A]$$, a positive continuous
function. Peel off the baseline:

$$
\frac1A\int_1^A e^{c/x}\,dx=\frac{A-1}{A}+\underbrace{\frac1A\int_1^A\big(e^{c/x}-1\big)\,dx}_{=:\,R(A)}.
$$

The first term $$\to 1$$, and $$e^{c/x}-1\ge 0$$ on $$[1,A]$$, so the limit is
$$1$$ iff $$R(A)\to 0$$. Note $$R(A)$$ is the *average excess over 1*.

Cut at $$B=(\ln A)^2$$ (legal since $$1<B<A$$ once $$c$$ is large; even $$c=2$$
gives $$4<e^2$$).

*Body $$[B,A]$$.* Here $$c/x\le c/c^2=1/c$$, and $$t\mapsto e^t-1$$ increases, so
$$0\le e^{c/x}-1\le e^{1/c}-1$$. Hence

$$
0\le \frac1A\int_B^A\big(e^{c/x}-1\big)dx\le e^{1/c}-1\xrightarrow[c\to\infty]{}0.
$$

*Spike $$[1,B]$$.* Drop the $$-1$$ and substitute $$w=c/x$$
($$dx=-\frac{c}{w^2}\,dw$$; limits $$w:c\to 1/c$$):

$$
\frac1A\int_1^B e^{c/x}\,dx=\frac cA\int_{1/c}^{c}\frac{e^w}{w^2}\,dw.
$$

Split at $$w=c/2$$. On $$[c/2,c]$$: $$\tfrac1{w^2}\le \tfrac4{c^2}$$ and
$$\int e^w\le e^c$$, giving $$\frac cA\cdot\frac{4e^c}{c^2}=\frac4c$$. On
$$[1/c,c/2]$$: $$e^w\le e^{c/2}$$ and $$\int_{1/c}^{c/2}w^{-2}\,dw\le c$$, giving
$$\frac cA\cdot c\,e^{c/2}=c^2e^{-c/2}$$. So

$$
0\le \frac1A\int_1^B\big(e^{c/x}-1\big)dx\le \frac{4}{\ln A}+\frac{(\ln A)^2}{\sqrt A}\to 0.
$$

Squeezing both pieces gives $$R(A)\to 0$$, so

$$
\lim_{A\to\infty}\frac1A\int_1^A A^{1/x}\,dx=1.
$$

The picture behind the algebra: a needle of height $$A$$ and width
$$\sim 1/\ln A$$ sitting on a plateau of height $$\approx 1$$ and width
$$\approx A$$. The plateau owns the average; the needle only adds a vanishing
$$\sim 1/\ln A$$. Pushing the expansion further,

$$
\frac1A\int_1^A A^{1/x}\,dx=1+\frac1{\ln A}+\frac{2}{(\ln A)^2}+\cdots,
$$

so convergence is to $$1$$ from above, at logarithmic speed.

Still open: deriving that $$1+1/\ln A+\cdots$$ expansion rigorously. It should
drop out of integrating $$\int e^w/w^2\,dw$$ by parts — the two boundary terms
nearly cancel — plus the exponential integral $$\mathrm{Ei}(c)\sim e^c/c$$. I
only bounded the spike, I didn't pin the constant.
