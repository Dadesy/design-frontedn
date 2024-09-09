import { ref, watchEffect } from "vue";
import { theme } from "ant-design-vue";

export function useThemeColors() {
  const token = theme.useToken();
  const colors = ref(token.token.value);

  watchEffect(() => {
    colors.value = token.token.value;
  });

  return { colors };
}
