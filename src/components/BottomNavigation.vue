<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-Ey/kc+O8TxRyHX6U+Cr6UO3+UZ8zUWJit/dh2ztbyIMs4w4SW4yBmmL+sJJPya0YzMWvItS9Z+ImoSTP30H+Gw==" crossorigin="anonymous" />
</head>

<template>
  <div class="bottom-navigation-container">
    <div class="bottom-navigation">
      <router-link to="/dashboard" class="bottom-navigation-item">
        <img
          src="../assets/icons/home.png"
          alt="Dashboard Icon"
          class="bottom-navigation-icon"
        />
        <span class="bottom-navigation-label">Dashboard</span>
      </router-link>
      <router-link to="/lifestyle-wellbeing" class="bottom-navigation-item">
        <img
          src="../assets/icons/lifestyle.png"
          alt="Lifestyle Wellbeing Icon"
          class="bottom-navigation-icon"
        />
        <span class="bottom-navigation-label">Lifestyle Wellbeing</span>
      </router-link>
      <router-link to="/mental-wellbeing" class="bottom-navigation-item">
        <img
          src="../assets/icons/mental_health.png"
          alt="Mental Wellbeing Icon"
          class="bottom-navigation-icon"
        />
        <span class="bottom-navigation-label">Mental Wellbeing</span>
      </router-link>
      <router-link to="/chat" class="bottom-navigation-item">
        <img
          src="../assets/icons/messages.png"
          alt="Chat Icon"
          class="bottom-navigation-icon"
        />
        <span class="bottom-navigation-label">Chat</span>
      </router-link>
      <router-link to="/profile" class="bottom-navigation-item">
        <img
          src="../assets/icons/user.png"
          alt="Profile Icon"
          class="bottom-navigation-icon"
        />
        <span class="bottom-navigation-label">Profile</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.bottom-navigation-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
.bottom-navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.bottom-navigation-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none;
  color: #333;
}

.bottom-navigation-icon {
  width: 24px;
  height: 24px;
}

.bottom-navigation-label {
  font-size: 16px;
  text-align: center;
}
</style>
