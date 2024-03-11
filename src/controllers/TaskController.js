const TaskModel = require("../models/TaskModel");

exports.create = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    reqBody.email = email;
    await TaskModel.create(reqBody);

    res.json({ status: "success", message: "Create Completed" });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.update = async (req, res) => {
  try {
    let email = req.headers["email"];
    let { id } = req.params;
    let reqBody = req.body;
    await TaskModel.updateOne({ _id: id, email: email }, reqBody);

    res.json({ status: "success", message: "Update Completed" });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let email = req.headers["email"];
    let { id } = req.params;
    let ToDoStatus = req.body["status"];
    await TaskModel.updateOne(
      { _id: id, email: email },
      { $set: { status: ToDoStatus } }
    );

    res.json({ status: "success", message: ToDoStatus });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.read = async (req, res) => {
  try {
    let email = req.headers["email"];
    let data = await TaskModel.find({ email: email });

    res.json({ status: "success", message: data });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    let email = req.headers["email"];
    let { id } = req.params;
    await TaskModel.deleteOne({ _id: id, email: email });

    res.json({ status: "success", message: "Delete Completed" });
  } catch (err) {
    res.json({ status: "fail", message: err });
  }
};
