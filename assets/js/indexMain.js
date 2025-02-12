const electron = require("electron");
const PDFWindow = require("electron-pdf-window");
const { BrowserWindow } = electron.remote;
// const SocketIOClient = require("socket.io-client");
const {io} = require("socket.io-client");
//   var socket = SocketIOClient('http://192.168.1.6:5000')
function GET_VARIABLES_SISTEMA(obs_variable, callback) {
  const parametros = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      obs_variable,
    }),
  };
  fetch(URL + "/get_variables_sistema", parametros)
    .then((req) => req.json())
    .then((res) => {
      callback(res.err, res.variables);
    });
}
$(".collection a").click(function () {
  alet("click");
  $(".collection").removeClass("active");
  $(this).parents(".collection").addClass("active");
});

$(document).ready(function () {
  $("input").characterCounter();
});

const remote = require("electron").remote;
const window_cu = remote.getCurrentWindow();
document.getElementById("min-btn").addEventListener("click", function (e) {
  window_cu.minimize();
});

document.getElementById("max-btn").addEventListener("click", function (e) {
  if (!window_cu.isMaximized()) {
    window_cu.maximize();
  } else {
    window_cu.unmaximize();
  }
});
document.getElementById("close-btn").addEventListener("click", function (e) {
  window_cu.close();
});
//FakeLoader
ShowLoader();
HideLoader();
function HideLoader() {
  setTimeout(function () {
    $(".fakeloader").html("");
    $(".fakeloader").css({
      backgroundColor: "",
      zIndex: "",
      width: "",
      height: "",
      position: "",
      top: "",
      left: "",
      display: "",
    });
  }, 500);
}

function ShowLoader() {
  $(".fakeloader").html(
    '<div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
  );
  $(".fakeloader").css({
    backgroundColor: "#2c2c54",
    zIndex: "999",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: "0px",
    left: "0px",
  });
  centerLoader();
  function centerLoader() {
    var winW = $(window).width();
    var winH = $(window).height();

    var spinnerW = $(".fl").outerWidth();
    var spinnerH = $(".fl").outerHeight();

    $(".fl").css({
      position: "absolute",
      left: winW / 2 - spinnerW / 2,
      top: winH / 2 - spinnerH / 2,
    });
  }

  $(window).load(function () {
    centerLoader();
    $(window).resize(function () {
      centerLoader();
    });
  });
}
//Funcion para validar campos
function Validar(props) {
  for (var id in props) {
    var el = document.getElementById(id);
    if (el == null) continue;
    var error_mesage = document.getElementById("l" + id);
    var value = el.value;
    var condiciones = props[id];
    if (value.length == 0) {
      if (el.nodeName == "SELECT") {
        error_mesage.className = "red-text";
      } else {
        el.classList = "invalid";
        error_mesage.classList = "active";
        error_mesage.setAttribute("data-error", "requerido");
        el.focus();
      }
      return false;
    }
    if (condiciones.minLen && condiciones.minLen > value.length) {
      el.classList = "invalid";
      error_mesage.classList = "active";
      error_mesage.setAttribute(
        "data-error",
        condiciones.minLen + " caracteres minimo"
      );
      el.focus();
      return false;
    }
    if (condiciones.maxLen && condiciones.maxLen < value.length) {
      el.classList = "invalid";
      error_mesage.classList = "active";
      error_mesage.setAttribute(
        "data-error",
        condiciones.maxLen + " caracteres maximo"
      );
      el.focus();
      return false;
    }
    if (condiciones.number_msg && (isNaN(value) || parseFloat(value) < 1)) {
      el.classList = "invalid";
      error_mesage.classList = "active";
      error_mesage.setAttribute("data-error", condiciones.number_msg);
      el.focus();
      return false;
    }
    if (condiciones.evaluador && !condiciones.evaluador(value)) {
      el.classList = "invalid";
      error_mesage.classList = "active";
      el.focus();
      return false;
    }
    el.classList = "valid";
    error_mesage.className = el.nodeName != "SELECT" ? "active" : "";
  }
  return true;
}
