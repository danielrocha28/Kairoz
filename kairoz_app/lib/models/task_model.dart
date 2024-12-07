class TaskModel {
  late String description;
  late bool isCompleted;

  TaskModel({
    required this.description,
    this.isCompleted = false,
  });
}
