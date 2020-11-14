<template>
  <nav class="navigation">
    <router-link to="/search" class="navigation-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        class="icon"
      >
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          fill=" hsl(228, 15%, 50%)"
        />
      </svg>
      <div class="text">Search</div>
    </router-link>
    <router-link to="/saved-stations" class="navigation-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        class="icon"
      >
        <path
          d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
          fill=" hsl(228, 15%, 50%)"
        />
      </svg>
      <div class="text">Saved</div>
    </router-link>
    <router-link to="/" class="navigation-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        class="icon"
      >
        <path
          d="M14.65 4.98l-5-1.75c-.42-.15-.88-.15-1.3-.01L4.36 4.56C3.55 4.84 3 5.6 3 6.46v11.85c0 1.41 1.41 2.37 2.72 1.86l2.93-1.14c.22-.09.47-.09.69-.01l5 1.75c.42.15.88.15 1.3.01l3.99-1.34c.81-.27 1.36-1.04 1.36-1.9V5.69c0-1.41-1.41-2.37-2.72-1.86l-2.93 1.14c-.22.08-.46.09-.69.01zM15 18.89l-6-2.11V5.11l6 2.11v11.67z"
          fill=" hsl(228, 15%, 50%)"
        />
      </svg>
      <div class="text">Map</div>
    </router-link>
    <router-link to="/information" class="navigation-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        class="icon"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z"
          fill=" hsl(228, 15%, 50%)"
        />
      </svg>
      <div class="text">Info</div>
    </router-link>
    <router-link to="/settings" class="navigation-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        class="icon"
      >
        <path
          class="image"
          d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
          fill=" hsl(228, 15%, 50%)"
        />
      </svg>
      <div class="text">Settings</div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style lang="scss" scoped>
.navigation {
  background-color: $background-primary;
  bottom: 0;
  font-family: sans-serif;
  display: flex;
  padding: 0 16px;
  position: fixed;
  width: 100%;

  // Overlapping map tiles
  z-index: 1002;
}

.navigation-link {
  color: $color-secondary;
  font-family: $font-base;
  padding: 8px 0;
  text-decoration: none;
  width: 20%;

  .icon {
    display: block;
    margin: auto;
  }

  .text {
    text-align: center;
  }

  &:focus {
    background-color: $background-active;
    box-shadow: $shadow-active;
  }
}

// Vue router active class
.navigation-link.router-link-exact-active {
  background-color: $background-active;
  color: $color-primary;

  .icon path {
    fill: $color-primary;
  }
}
</style>
