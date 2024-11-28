import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Definir Meta de Sono',
      theme: ThemeData(
        primarySwatch: Colors.purple,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: SleepGoalSetter(),
    );
  }
}

class SleepGoalSetter extends StatefulWidget {
  @override
  _SleepGoalSetterState createState() => _SleepGoalSetterState();
}

class _SleepGoalSetterState extends State<SleepGoalSetter> {
  TextEditingController _goalController = TextEditingController();
  String _sleepGoal = ''; 
  bool _goalSaved = false; 

  void _saveGoal() {
    setState(() {
      _sleepGoal = _goalController.text; 
      _goalSaved = true; 
    });
    _goalController.clear(); 
  }

  
  void _resetGoal() {
    setState(() {
      _goalSaved = false; 
      _sleepGoal = ''; 
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (!_goalSaved) ...[
              Center(
                child: Text(
                  'Definir meta',
                  style: TextStyle(fontSize: 24),
                ),
              ),
              SizedBox(height: 20),

              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: Text(
                  'Um bom descanso é sempre importante. Defina uma meta para melhorar a sua rotina!',
                  textAlign: TextAlign.center, 
                  style: TextStyle(fontSize: 16, color: Colors.grey[700]),
                ),
              ),
            ],

            if (!_goalSaved)
              Column(
                children: [
                  TextField(
                    controller: _goalController,
                    keyboardType: TextInputType.number, 
                    decoration: InputDecoration(
                      labelText: 'Quantas horas de sono você deseja?',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      contentPadding: EdgeInsets.symmetric(vertical: 18, horizontal: 18),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _saveGoal,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.purple,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                      padding: EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: Text(
                      'Salvar',
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ],
              ),

            if (_goalSaved)
              Column(
                children: [
                  SizedBox(height: 40),
                  Text(
                    'Você precisa atingir a meta de $_sleepGoal horas de sono!',
                    style: TextStyle(
                      fontSize: 20,
                      color: const Color.fromARGB(255, 0, 0, 0),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _resetGoal,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.purple, 
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                      padding: EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: Text(
                      'Redefinir Meta',
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
