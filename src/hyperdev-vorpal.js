const Vorpal = require("vorpal");

const _tableStyle = {
  chars: {
    top: "",
    "top-mid": "",
    "top-left": "",
    "top-right": "",
    bottom: "",
    "bottom-mid": "",
    "bottom-left": "",
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "",
    "right-mid": "",
    middle: " "
  },
  style: { "padding-left": 0, "padding-right": 5, head: [] }
};

module.exports = (client, tableStyle = _tableStyle) => {

    vorpal = Vorpal();
    vorpal.use(require("./commands/app")({ client, tableStyle }));
    vorpal.use(require("./commands/instance")({ client, tableStyle }));
    vorpal.use(require("./commands/bucket")({ client, tableStyle }));
    return vorpal;

}