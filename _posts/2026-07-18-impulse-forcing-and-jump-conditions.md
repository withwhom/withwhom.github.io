---
layout: scrap
title: "Impulse forcing and jump conditions"
date: 2026-07-18
tags: [ODE]
---

$$\delta$$-function forcing in Laplace methods, and where the jump in $$df/dt$$ actually comes from.

## The computation

Take the undamped oscillator hit by a unit impulse at time $$a > 0$$, starting from rest:

$$
y'' + \omega^2 y = \delta(t - a), \qquad y(0) = y'(0) = 0.
$$

Since $$\mathcal{L}\{\delta(t-a)\} = e^{-as}$$,

$$
Y(s) = \frac{e^{-as}}{s^2 + \omega^2}
\quad\Longrightarrow\quad
y(t) = u_a(t)\,\frac{\sin \omega (t - a)}{\omega},
$$

where $$u_a$$ is the unit step at $$a$$. The solution is continuous at $$t = a$$, but
$$y'$$ jumps from $$0$$ to $$1$$ there.

## Where the jump comes from

The transform hides it, so integrate the equation directly over $$[a - \varepsilon, a + \varepsilon]$$:

$$
\bigl[y'\bigr]_{a-\varepsilon}^{a+\varepsilon} + \omega^2 \int_{a-\varepsilon}^{a+\varepsilon} y \, dt = 1.
$$

As $$\varepsilon \to 0$$ the integral term vanishes because $$y$$ is bounded, leaving
$$y'(a^+) - y'(a^-) = 1$$. So the impulse is exactly a jump condition on the highest
derivative present, and the size of the jump is the coefficient of that derivative
inverted. For $$m y'' + \cdots = \delta(t - a)$$ the jump in $$y'$$ is $$1/m$$, which
is just "impulse equals change in momentum".

The thing that confused me: nothing about $$y$$ itself jumps. One order of integration
turns $$\delta$$ into a step, and it is that step that shows up in $$y'$$.
