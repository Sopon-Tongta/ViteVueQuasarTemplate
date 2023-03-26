<template>
  <q-layout view="hhh LpR fFf">
    <q-header class="header-main">
      <q-toolbar class="toolbar">
        <q-toolbar-title>
          <div class="logo" :onClick="logoClick">E-Service</div>
          <div class="version">Version 1.0.0</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="container">
      <router-view
        v-on:onRedirect="onRedirect"
        v-on:showLoading="showLoading"
        v-on:hideLoading="hideLoading"
        v-on:alert="childUseAlert"
        v-on:confirm="childUseConfirm"
        v-on:confirmInput="childUseConfirmInput"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, QSpinnerCube } from "quasar";
import { useMasterDataStore } from "../stores/MasterDataStore";
export default {
  setup() {
    const masterStore = useMasterDataStore();
    const { getMaster } = masterStore;
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const showLoading = () => {
      $q.loading.show({
        spinner: QSpinnerCube,
        spinnerSize: 50,
        spinnerColor: "theme-color",
        messageColor: "black",
        backgroundColor: "white",
      });
    };

    const hideLoading = () => {
      $q.loading.hide();
    };

    const pageParams = sessionStorage.getItem("e_service_params");
    if (pageParams !== null) {
      const objParams = JSON.parse(pageParams);
      let paramList = Object.keys(objParams);
      paramList.forEach((paramName) => {
        route.params[paramName] = objParams[paramName];
      });
    }

    const onRedirect = (name, params) => {
      showLoading();
      params = params == undefined ? {} : params;
      sessionStorage.setItem("e_service_params", JSON.stringify(params));
      router.push({ name: name, params: params }).then(() => {
        hideLoading();
      });
    };

    onMounted(async () => {
      showLoading();
      await getMaster();
      hideLoading();
    });

    //=== Alert ===
    const alertShow = ref(false);
    const alertClass = ref("");
    const alertColor = ref("");
    const alertContant = ref("");
    const alertOnSubmit = ref(() => {});
    const childUseAlert = (message, cls, onFunc) => {
      alertContant.value = message;
      alertClass.value = "alert alert-info bg-blue";
      alertColor.value = "blue";
      if (cls !== undefined && cls !== null) {
        switch (cls.toLowerCase()) {
          case "info":
            alertColor.value = "blue";
            alertClass.value = "alert alert-info bg-".concat(alertColor.value);
            break;
          case "success":
            alertColor.value = "theme-color";
            alertClass.value = "alert alert-success bg-".concat(alertColor.value);
            break;
          case "warning":
            alertColor.value = "orange";
            alertClass.value = "alert alert-warning bg-".concat(alertColor.value);
            break;
          case "error":
            alertColor.value = "red";
            alertClass.value = "alert alert-error bg-".concat(alertColor.value);
            break;
        }
      }
      alertOnSubmit.value = () => {
        if (typeof onFunc === "function") {
          onFunc();
        }
        alertShow.value = false;
      };
      alertShow.value = true;
    };
    //=== Confirm ===
    const confirmTitle = ref("");
    const confirmContant = ref("");
    const confirmShow = ref(false);
    const confirmOnSubmit = ref(() => {});
    const childUseConfirm = (title, contant, onFunc) => {
      confirmTitle.value = title;
      confirmContant.value = contant;
      confirmOnSubmit.value = () => {
        if (typeof onFunc === "function") {
          onFunc();
        }
        confirmShow.value = false;
      };
      confirmShow.value = true;
    };
    //=== Confirm Input===
    const confirmInputTitle = ref("");
    const confirmInputText = ref("");
    const confirmInputForm = ref("");
    const confirmInputShow = ref(false);
    const confirmInputOnSubmit = ref(() => {});
    const childUseConfirmInput = (title, textInput, onFunc) => {
      confirmInputTitle.value = title;
      confirmInputText.value = textInput;
      confirmInputForm.value = "";
      confirmInputOnSubmit.value = () => {
        if (typeof onFunc === "function") {
          onFunc(confirmInputForm.value);
        }
        confirmInputShow.value = false;
      };
      confirmInputShow.value = true;
    };

    const logoClick = () => {
      onRedirect("index");
    };

    return {
      logoClick,
      onRedirect,
      showLoading,
      hideLoading,
      alertShow,
      alertClass,
      alertColor,
      alertContant,
      alertOnSubmit,
      childUseAlert,
      confirmShow,
      confirmTitle,
      confirmContant,
      confirmOnSubmit,
      childUseConfirm,
      confirmInputShow,
      confirmInputTitle,
      confirmInputText,
      confirmInputForm,
      confirmInputOnSubmit,
      childUseConfirmInput,
    };
  },
};
</script>
<style lang="scss">
.header-main {
  background-color: #ebf4f0;
  font-family: "Prompt-Regular";
  color: #333;
  .toolbar {
    color: white;
    background-color: $themeColor;
    height: 60px;
    padding: 0px 25px;
    .logo {
      margin-top: -5px;
      margin-bottom: -15px;
      font-size: 2.25rem;
      font-weight: bold;
      letter-spacing: 0.0125em;
      width: 170px;
      cursor: pointer;
    }
    .version {
      margin-left: 2px;
      font-size: 12px;
      width: 80px;
      cursor: pointer;
    }
  }
}
.left-drawer-inventory {
  background: #f0f0f0;
  .c-btn-close {
    color: #333;
    font-size: 10px;
  }
  .drawer-main-title {
    font-family: "Prompt-SemiBold";
    font-size: 25px;
  }
  .drawer-sub-title {
    font-family: "Prompt-Light";
    font-size: 12px;
  }
  .drawer-main-menu,
  .q-item__label {
    font-family: "Prompt-Light";
    font-size: 20px;
    font-weight: bold;
  }
  .drawer-sub-menu {
    font-family: "Prompt-Light";
    font-size: 20px;
    padding-left: 15px;
  }
}
.container {
  max-height: calc(100vh-95px);
  height: calc(100vh-95px);
}
.alert {
  .titie {
    div {
      display: flex;
      align-items: center;
    }
    .icon {
      margin-right: 10px;
    }
    .text {
      font-family: "Prompt-ExtraBold";
      font-size: 22px;
      color: white;
    }
  }
  .contant {
    font-family: "Prompt-Regular";
    font-size: 16px;
  }
}
.msg-confirm {
  .titie {
    text-align: center;
    font-family: "Prompt-ExtraBold";
    font-size: 22px;
    color: white;
  }
  .contant {
    text-align: center;
    font-family: "Prompt-Regular";
    font-size: 16px;
  }
  .box-btn-action {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.msg-confirm-input {
  .titie {
    text-align: center;
    font-family: "Prompt-ExtraBold";
    font-size: 22px;
    color: white;
  }
  .text-input {
    font-family: "Prompt-Regular";
    font-size: 16px;
  }
  .form-input {
    width: 100%;
    max-height: 300px;
    height: 100%;
  }
  .box-btn-action {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
