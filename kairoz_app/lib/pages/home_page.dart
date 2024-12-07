import 'package:flutter/material.dart';
import 'package:kairoz/models/task.dart';
import 'package:kairoz/pages/add_task_page.dart';
import 'package:kairoz/services/task_create.service.dart';
import 'package:kairoz/widgets/drawer.dart';
import 'package:shimmer/shimmer.dart';
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
  bool _isLoading = true;

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
                description: taskRes.description ?? '',
                recurrence: getRecurrence(taskRes.repeat ?? ''),
                priority: getPriority(taskRes.priority ?? ''),
              ))
          .toList();

      if (mounted) {
        setState(() {
          _isLoading = false;
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
        return TaskCategory.study;
    }
  }

  getRecurrence(String value) {
    switch (value) {
      case 'daily':
        return TaskRecurrence.daily;
      case 'weekly':
        return TaskRecurrence.weekly;
      case 'monthly':
        return TaskRecurrence.monthly;
      case 'yearly':
        return TaskRecurrence.yearly;
      default:
        return TaskRecurrence.none;
    }
  }

  getPriority(String value) {
    switch (value) {
      case 'low':
        return TaskPriority.low;
      case 'medium':
        return TaskPriority.medium;
      case 'high':
        return TaskPriority.high;
      default:
        return TaskPriority.low;
    }
  }

  void _showAddTaskModal() async {
    final task = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddTaskScreen()),
    );

    if (task != null) {
      setState(() {
        _tasks.add(task);
      });
    }
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
      backgroundColor: Colors.grey[100],
      bottomNavigationBar: CustomBottomNavBar(
        selectedIndex: _selectedIndex,
        onTabChange: navigateToPage,
      ),
      appBar: const MyAppBar(
        title: "Kairoz",
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
      body: _isLoading
          ? Padding(
              padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 10),
              child: Column(
                children: [
                  const SizedBox(height: 24),
                  SizedBox(
                    height: 50.0,
                    child: Shimmer.fromColors(
                      baseColor: Colors.grey[300]!,
                      highlightColor: Colors.grey[100]!,
                      child: Container(
                        width: double.infinity,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: List.generate(7, (index) {
                      return Shimmer.fromColors(
                        baseColor: Colors.grey[300]!,
                        highlightColor: Colors.grey[100]!,
                        child: CircleAvatar(
                          radius: 30.0,
                          backgroundColor: Colors.white,
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 100.0,
                    child: Shimmer.fromColors(
                      baseColor: Colors.grey[300]!,
                      highlightColor: Colors.grey[100]!,
                      child: Container(
                        width: double.infinity,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Expanded(
                    child: ListView.builder(
                      itemCount: 10,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 8.0),
                          child: Shimmer.fromColors(
                            baseColor: Colors.grey[300]!,
                            highlightColor: Colors.grey[100]!,
                            child: Container(
                              width: double.infinity,
                              height: 100.0,
                              color: Colors.white,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            )
          : IndexedStack(
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
