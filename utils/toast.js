export const showToast = (
  text,
  title = "Ошибка",
  variant = "danger",
  autoHideDelay = 5000
) => {
  return $nuxt.$bvToast.toast(text, { title, autoHideDelay, variant });
};
