import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kairoz/pages/detalhes_page.dart';

class BlocoWidget extends StatelessWidget {
  final String texto;
  final Color corTexto;
  final List<String> descricao;
  final String detalhesId;

  const BlocoWidget({
    super.key,
    required this.texto,
    required this.corTexto,
    required this.descricao,
    required this.detalhesId,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        showDialog(
          context: context,
          builder: (context) {
            return CupertinoAlertDialog(
              title: Text(
                texto,
                style: TextStyle(color: corTexto),
              ),
              content: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: descricao.map((desc) => Text('• $desc')).toList(),
              ),
              actions: [
                CupertinoDialogAction(
                  child: const Text(
                    'Fechar',
                    style: TextStyle(color: Color.fromARGB(255, 82, 22, 185)),
                  ),
                  onPressed: () => Navigator.pop(context),
                ),
                CupertinoDialogAction(
                  child: const Text(
                    'Mais Informações',
                    style: TextStyle(color: Color.fromARGB(255, 82, 22, 185)),
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      CupertinoPageRoute(
                        builder: (context) => DetalhesPage(
                          titulo: texto,
                          detalhesId: detalhesId,
                        ),
                      ),
                    );
                  },
                ),
              ],
            );
          },
        );
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(30),
          border: Border.all(
            width: 1,
            color: const Color.fromARGB(255, 82, 22, 185),
          ),
        ),
        width: 100,
        height: 120,
        margin: const EdgeInsets.only(right: 10),
        child: Center(
          child: Text(
            texto,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: corTexto,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }
}
