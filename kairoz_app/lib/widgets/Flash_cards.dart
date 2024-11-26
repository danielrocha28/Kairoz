import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

class HomesPage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomesPage> {
  List<Map<String, String>> textos = [];

  void adicionarTexto(Map<String, String> texto) {
    setState(() {
      textos.add(texto);
    });
  }

  void deletarTexto(int index) {
    setState(() {
      textos.removeAt(index);
    });
  }

  void editarTexto(int index, Map<String, String> novoTexto) {
    setState(() {
      textos[index] = novoTexto;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            const Text(
              'Crie os seus Flashcards!',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                final novoTexto = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const AdicionarTextoPage(),
                  ),
                );
                if (novoTexto != null) {
                  adicionarTexto(novoTexto);
                }
              },
              child: const Text('Criar Flashcards'),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: textos.isEmpty
                  ? const Center(child: Text('Nenhum flashcard criado ainda!'))
                  : CarouselSlider.builder(
                      itemCount: textos.length,
                      itemBuilder: (context, index, realIndex) {
                        return Card(
                          elevation: 4,
                          margin: const EdgeInsets.symmetric(
                              vertical: 8.0, horizontal: 16.0),
                          child: Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  textos[index]['titulo']!,
                                  style: const TextStyle(
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 8.0),
                                Text(
                                  textos[index]['texto']!,
                                  style: const TextStyle(fontSize: 16),
                                ),
                                const SizedBox(height: 8.0),
                                Align(
                                  alignment: Alignment.centerRight,
                                  child: PopupMenuButton<String>(
                                    icon: const Icon(Icons.more_vert),
                                    onSelected: (value) {
                                      if (value == 'editar') {
                                        _editarTexto(context, index);
                                      } else if (value == 'excluir') {
                                        deletarTexto(index);
                                      }
                                    },
                                    itemBuilder: (context) => [
                                      const PopupMenuItem(
                                        value: 'editar',
                                        child: Text('Editar'),
                                      ),
                                      const PopupMenuItem(
                                        value: 'excluir',
                                        child: Text('Excluir'),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                      options: CarouselOptions(
                        height: 400,
                        enlargeCenterPage: true,
                        autoPlay: false,
                        aspectRatio: 16 / 9,
                        viewportFraction: 0.8,
                        enableInfiniteScroll: false,
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  void _editarTexto(BuildContext context, int index) async {
    final novoTexto = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AdicionarTextoPage(
          textoAtual: textos[index],
        ),
      ),
    );
    if (novoTexto != null) {
      editarTexto(index, novoTexto);
    }
  }
}

class AdicionarTextoPage extends StatefulWidget {
  final Map<String, String>? textoAtual;

  const AdicionarTextoPage({this.textoAtual});

  @override
  AdicionarTextoPageState createState() => AdicionarTextoPageState();
}

class AdicionarTextoPageState extends State<AdicionarTextoPage> {
  final TextEditingController _tituloController = TextEditingController();
  final TextEditingController _textoController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.textoAtual != null) {
      _tituloController.text = widget.textoAtual!['titulo']!;
      _textoController.text = widget.textoAtual!['texto']!;
    }
  }

  void _adicionarTexto() {
    if (_tituloController.text.isEmpty || _textoController.text.isEmpty) {
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            content: const Text('Por favor, insira um título e um texto.'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('OK'),
              ),
            ],
          );
        },
      );
      return;
    }

    Navigator.pop(context, {
      'titulo': _tituloController.text,
      'texto': _textoController.text,
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.textoAtual != null
            ? 'Editar Flashcard'
            : 'Adicionar Flashcard'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _tituloController,
              decoration: const InputDecoration(
                labelText: 'Título',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16.0),
            TextField(
              controller: _textoController,
              decoration: const InputDecoration(
                labelText: 'Texto',
                border: OutlineInputBorder(),
              ),
              maxLines: 5,
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: _adicionarTexto,
              child: Text(widget.textoAtual != null ? 'Salvar' : 'Adicionar'),
            ),
          ],
        ),
      ),
    );
  }
}
