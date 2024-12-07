class TaskResponse {
  int? idTask;
  String? title;
  Null description;
  Null parentid;
  String? repeat;
  String? category;
  String? priority;
  String? status;
  String? dueDate;
  String? reminder;
  String? notes;
  int? idUser;
  String? createdAt;
  String? updatedAt;

  TaskResponse({
    this.idTask,
    this.title,
    this.description,
    this.parentid,
    this.repeat,
    this.category,
    this.priority,
    this.status,
    this.dueDate,
    this.reminder,
    this.notes,
    this.idUser,
    this.createdAt,
    this.updatedAt,
  });

  TaskResponse.fromJson(Map<String, dynamic> json) {
    idTask = json['id_task'];
    title = json['title'];
    description = json['description'];
    parentid = json['parentid'];
    repeat = json['repeat'];
    category = json['category'];
    priority = json['priority'];
    status = json['status'];
    dueDate = json['dueDate'];
    reminder = json['reminder'];
    notes = json['notes'];
    idUser = json['id_user'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id_task'] = idTask;
    data['title'] = title;
    data['description'] = description;
    data['parentid'] = parentid;
    data['repeat'] = repeat;
    data['category'] = category;
    data['priority'] = priority;
    data['status'] = status;
    data['dueDate'] = dueDate;
    data['reminder'] = reminder;
    data['notes'] = notes;
    data['id_user'] = idUser;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    return data;
  }
}
