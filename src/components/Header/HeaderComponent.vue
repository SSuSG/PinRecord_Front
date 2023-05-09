<template>
  <StyledHeader>
    <div>로고</div>
    <ButtonList>
      <ButtonLi><button>Login</button></ButtonLi>
      <ButtonLi><button>MyPage</button></ButtonLi>
    </ButtonList>
  </StyledHeader>
</template>

<script>
import { StyledHeader, ButtonList, ButtonLi } from "@/components/Header/style";

export default {
  name: "HeaderComponent",
  components: {
    StyledHeader,
    ButtonList,
    ButtonLi,
  },
};
</script>
<style></style>
