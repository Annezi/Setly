# Checkplans Smoke Checklist

Use this quick checklist after refactors in `check-plans`, `create-checkplan`, and related shared utils.

- [ ] Open `/check-plans`: no hydration/runtime errors in browser console (header portals mount only after hydration).
- [ ] Scroll long pages (`/check-plans`, `/articles`, главная): хедер сначала уезжает вверх в потоке, затем «прилипает» с отступом `top` — не должен быть обёрнут только в «короткий» div/`ScrollReveal` без общего родителя с контентом.
- [ ] Switch sort between `По новизне` and `По популярности`: order changes correctly.
- [ ] Apply several filters and remove tags one by one: result list updates without visual glitches.
- [ ] Search by title/tag text and submit: matching cards are shown; empty result shows not-found state.
- [ ] Open one plan from `/check-plans` and from `/account`: navigation to preview works.
- [ ] Open `/account` while authenticated: header shows profile avatar, no hydration mismatch (auth is read only after mount, not in `useState` initializers).
- [ ] Open `/account` while unauthenticated (or after logout): header shows `Войти`, no hydration mismatch.
- [ ] Open `/preview-checkplan/[id_str]`: popular carousel loads cards and images correctly.
- [ ] Verify like counters are visible and consistent on public cards.
