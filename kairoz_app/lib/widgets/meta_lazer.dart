import 'package:flutter/material.dart';

class PersonalGoalSetter extends StatefulWidget {
  @override
  _PersonalGoalSetterState createState() => _PersonalGoalSetterState();
}

class _PersonalGoalSetterState extends State<PersonalGoalSetter> {
  TextEditingController _goalController = TextEditingController();
  String _personalGoal = '';
  bool _goalSaved = false;

  void _saveGoal() {
    setState(() {
      _personalGoal = _goalController.text;
      _goalSaved = true;
    });
    _goalController.clear();
  }

  void _resetGoal() {
    setState(() {
      _goalSaved = false;
      _personalGoal = '';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            if (!_goalSaved) ...[
              Center(
                child: Text(
                  'Definir Meta Pessoal',
                  style: TextStyle(fontSize: 24),
                ),
              ),
              SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20.0),
                child: Text(
                  'O que você deseja fazer neste final de semana ou no seu tempo livre? Defina uma meta para organizar suas ideias!',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontSize: 16,
                      color: const Color.fromARGB(255, 22, 3, 41)),
                ),
              ),
            ],
            if (!_goalSaved)
              Column(
                children: [
                  TextField(
                    controller: _goalController,
                    decoration: InputDecoration(
                      labelText: 'Escreva sua meta pessoal',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 18, horizontal: 18),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _saveGoal,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color.fromARGB(255, 82, 22, 185),
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
                    'Sua meta pessoal: "$_personalGoal"',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 20,
                      color: const Color.fromARGB(255, 0, 0, 0),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _resetGoal,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color.fromARGB(255, 82, 22, 185),
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
