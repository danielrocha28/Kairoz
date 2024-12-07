import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/services/task_create.service.dart';
import 'package:kairoz/widgets/add_task_modal.dart';
import 'package:kairoz/widgets/drawer.dart';
import 'profile_page.dart';
import 'package:kairoz/widgets/nav_bar.dart';
import 'package:kairoz/pages/estudos_page.dart';
import 'package:kairoz/pages/saude_page.dart';
import 'package:kairoz/pages/trabalho_page.dart';
import 'package:kairoz/pages/lazer_page.dart';
import 'package:kairoz/widgets/appbar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  final List<Task> _tasks = [];

  void goToHomePage() {
    Navigator.pushNamed(context, '/home');
  }

  void goToProfilePage() {
    Navigator.pop(context);
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ProfilePage(),
      ),
    );
  }

  void signOut() {
    Navigator.pushNamedAndRemoveUntil(
        context, '/login', ModalRoute.withName('/'));
  }

  void navigateToPage(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void _fetchTasks() async {
    try {
      final service = TaskFetchService();
      final taskData = await service.fetchTasks();

      final newTasks = taskData
          .map((taskRes) => Task(
                title: taskRes.title ?? '',
                category: getType(taskRes.category ?? ''),
                dueDate: DateTime.parse(
                    taskRes.dueDate ?? DateTime.now().toString()),
              ))
          .toList();

      if (mounted) {
        setState(() {
          _tasks.clear();
          _tasks.addAll(newTasks);
        });
      }
    } catch (e) {
      print('Erro ao buscar tarefas: $e');
    }
  }

  getType(String value) {
    switch (value) {
      case 'study':
        return TaskCategory.study;
      case 'health':
        return TaskCategory.health;
      case 'work':
        return TaskCategory.work;
      case 'leisure':
        return TaskCategory.leisure;
      default:
        TaskCategory.study;
    }
  }

  getFromEnum(TaskCategory value) {
    switch (value) {
      case TaskCategory.study:
        return 'study';
      case TaskCategory.health:
        return 'health';
      case TaskCategory.work:
        return 'work';
      case TaskCategory.leisure:
        return 'leisure';
      default:
        'study';
    }
  }

  void _addTask(Task task) async {
    final service = TaskCreateService(
      title: task.title,
      category: getFromEnum(task.category),
      date: task.dueDate,
    );

    try {
      await service.execute();
      setState(() {
        _tasks.add(task);
      });
    } catch (e) {
      print('Erro ao adicionar tarefa: $e');
    }
  }

  void _showAddTaskModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) => AddTaskModal(onTaskAdded: _addTask),
    );
  }

  filterByType(TaskCategory category) {
    return _tasks.where((item) => item.category == category).toList();
  }

  @override
  void initState() {
    super.initState();
    _fetchTasks();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: const Color(0xffE4E1F3),
      backgroundColor: Colors.grey[100],
      bottomNavigationBar: CustomBottomNavBar(
        selectedIndex: _selectedIndex,
        onTabChange: navigateToPage,
      ),
      appBar: const MyAppBar(
        title: "Kairoz",
        iconTheme: IconThemeData(color: Colors.white),
        iconTheme: IconThemeData(color: Colors.white),
      ),
      drawer: MyDrawer(
        foregroundColor: Colors.white,
        onHomeTap: goToHomePage,
        onProfileTap: goToProfilePage,
        onSignOut: signOut,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddTaskModal,
        child: const Icon(Icons.add),
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: <Widget>[
          EstudosPage(tasks: filterByType(TaskCategory.study)),
          SaudePage(tasks: filterByType(TaskCategory.health)),
          TrabalhoPage(tasks: filterByType(TaskCategory.work)),
          LazerPage(tasks: filterByType(TaskCategory.leisure)),
        ],
      ),
    );
  }
}
