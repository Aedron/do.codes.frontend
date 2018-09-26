import toast from "native-toast";

function info(text) {
  toast({
    closeOnClick: true,
    edge: true,
    message: text,
    position: "south",
    timeout: 3000,
    type: "info"
  });
}

function err(text) {
  toast({
    closeOnClick: true,
    edge: true,
    message: text,
    position: "south",
    timeout: 3000,
    type: "error"
  });
}

function ok(text) {
  toast({
    closeOnClick: true,
    edge: true,
    message: text,
    position: "south",
    timeout: 3000,
    type: "success"
  });
}


export {
  info,
  err,
  ok
}
