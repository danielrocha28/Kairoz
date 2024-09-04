import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<String> listaDeFazeres = [];

  adicionarLista(String item) {
    setState(() {
      listaDeFazeres.add(item);
    });
  }

  // Função para mostrar o pop-up de adição
  void _showAddPopup(BuildContext context) {
    final TextEditingController _controller = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Adicionar"),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(
              labelText: "Tarefa",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                adicionarLista(_controller.text);
                Navigator.of(context).pop();
              },
              child: const Text("Adicionar Tarefa"),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Cancelar"),
            ),
          ],
        );
      },
    );
  }

  // Função para mostrar o pop-up de remoção
  void _showSubPopup(BuildContext context) {
    final TextEditingController _controller = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Remover"),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(
              labelText: "Tarefa",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                final String taskToRemove = _controller.text;

                setState(() {
                  // Remove o item da lista se existir
                  listaDeFazeres.remove(taskToRemove);
                });

                Navigator.of(context).pop();
              },
              child: const Text("Remover Tarefa"),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Cancelar"),
            ),
          ],
        );
      },
    );
  }

  // Função para criar os botões do SpeedDial
  SpeedDialChild speedDialButton(
      Function() aoClicar, IconData icon, String label, Color cor) {
    return SpeedDialChild(
      onTap: aoClicar,
      child: Icon(icon),
      backgroundColor: const Color.fromARGB(255, 151, 63, 192),
      foregroundColor: cor,
      label: label,
      labelStyle: TextStyle(color: Colors.white),
      labelBackgroundColor: const Color.fromARGB(255, 151, 63, 192),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          PopupMenuButton(
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: "firstPage",
                child: Text("First Page"),
              ),
              const PopupMenuItem(
                value: "secondPage",
                child: Text("Second Page"),
              ),
            ],
          ),
        ],
        title: const Text(
          'Kaizer',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: listaDeFazeres
              .map(
                (item) => CheckboxListTile(
                  title: Text(item),
                  value: false,
                  onChanged: (bool? value) {},
                ),
              )
              .toList(),
        ),
      ),
      floatingActionButton: SpeedDial(
        icon: Icons.add,
        backgroundColor: Theme.of(context).primaryColor,
        foregroundColor: Colors.white,
        overlayColor: Colors.black,
        overlayOpacity: 0.5,
        animatedIcon: AnimatedIcons.menu_close,
        children: [
          speedDialButton(
            () => _showSubPopup(context),
            Icons.remove,
            'Remover',
            Colors.white,
          ),
          speedDialButton(
            () => _showAddPopup(context),
            Icons.add,
            'Adicionar',
            Colors.white,
          ),
        ],
      ),
    );
  }
}
