import 'package:flutter/material.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';

class Tela_informacoes extends StatefulWidget {
  @override
  _Tela_informacoesState createState() => _Tela_informacoesState();
}

class _Tela_informacoesState extends State<Tela_informacoes> {
  late YoutubePlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = YoutubePlayerController(
      initialVideoId: 'oZgaqzpx90Y', // ID do vídeo
      flags: YoutubePlayerFlags(
        autoPlay: false,
        mute: false,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Informações sobre o conteúdo'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      // body: Column(
      //   mainAxisAlignment: MainAxisAlignment.start,
      //   children: [
      //     const Padding(
      //       padding: EdgeInsets.all(16.0),
      //       child: Text(
      //         'As informações da recomendações entraram aqui',
      //         style: TextStyle(fontSize: 20),
      //       ),
      //     ),
      //     Center(
      //       child: Image.network(
      //         'https://example.com/imagem.jpg', 
      //         height: 200,
      //         fit: BoxFit.cover,
      //       ),
      //     ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: YoutubePlayer(
              controller: _controller,
              showVideoProgressIndicator: true,
              onReady: () {
              },
            ),
          ),
        ],
      ),
    );
  }
}
