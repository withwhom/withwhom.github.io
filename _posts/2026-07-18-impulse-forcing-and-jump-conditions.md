---
layout: scrap
title: "Impulse forcing and jump conditions"
date: 2026-07-18
tags: [ODE]
---

Solving an oscillator hit by a $$\delta$$-function with the Laplace transform, I got the right answer but could not see where the jump in $$dy/dt$$ actually comes from.

Take the undamped oscillator hit by a unit impulse at time $$a > 0$$, starting from rest ($$y = 0$$ and $$dy/dt = 0$$ at $$t = 0$$):

$$
\frac{d^2y}{dt^2} + \omega^2 y = \delta(t - a).
$$

Since $$\mathcal{L}\{\delta(t-a)\} = e^{-as}$$,

$$
Y(s) = \frac{e^{-as}}{s^2 + \omega^2}
\quad\Longrightarrow\quad
y(t) = u_a(t)\,\frac{\sin \omega (t - a)}{\omega},
$$

where $$u_a$$ is the unit step at $$a$$. The solution is continuous at $$t = a$$, but
$$dy/dt$$ jumps from $$0$$ to $$1$$ there.

The transform hides where that jump comes from, so integrate the equation directly over $$[a - \varepsilon, a + \varepsilon]$$:

$$
\Bigl[\frac{dy}{dt}\Bigr]_{a-\varepsilon}^{a+\varepsilon} + \omega^2 \int_{a-\varepsilon}^{a+\varepsilon} y \, dt = 1.
$$

As $$\varepsilon \to 0$$ the integral term vanishes because $$y$$ is bounded, leaving a jump of exactly $$1$$
in $$dy/dt$$ at $$t = a$$. So the impulse is exactly a jump condition on the highest
derivative present, and the size of the jump is the coefficient of that derivative
inverted. For $$m\,d^2y/dt^2 + \cdots = \delta(t - a)$$ the jump in $$dy/dt$$ is $$1/m$$, which
is just "impulse equals change in momentum".

The thing that confused me: nothing about $$y$$ itself jumps. One order of integration
turns $$\delta$$ into a step, and it is that step that shows up in $$dy/dt$$.
