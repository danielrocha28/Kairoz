import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class CardService {
  final int idCards;
  final String front;
  final String verse;
  final int idDecks;

  const CardService({
    required this.idCards,
    required this.idDecks,
    required this.front,
    required this.verse,
  });

  Future<String> deleteCard() async {
    final baseUrl = dotenv.env['BASE_URL'];

    if (baseUrl == null) {
      return 'Erro: URL base não definida no ambiente.';
    }

    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/cards/$idCards'),
      );

      if (response.statusCode == 200) {
        final responseJson = jsonDecode(response.body);
        return responseJson['message'] ?? 'Carta deletada com sucesso';
      } else {
        final responseJson = jsonDecode(response.body);
        return 'Erro ao deletar a carta: ${responseJson['error'] ?? response.statusCode}';
      }
    } catch (e) {
      return 'Ocorreu um erro ao deletar a carta. Tente novamente!';
    }
  }

  Future<String> getCard() async {
    final baseUrl = dotenv.env['BASE_URL'];

    if (baseUrl == null) {
      return 'Erro: URL base não definida no ambiente.';
    }

    try {
      final response = await http.get(
        Uri.parse('$baseUrl/cards/$idCards'),
      );

      if (response.statusCode == 200) {
        final responseJson = jsonDecode(response.body);
        return jsonEncode(responseJson);
      } else {
        final responseJson = jsonDecode(response.body);
        return 'Erro ao encontrar a carta: ${responseJson['error'] ?? response.statusCode}';
      }
    } catch (e) {
      return 'Ocorreu um erro ao encontrar a carta. Tente novamente!';
    }
  }

  Future<String> newCard() async {
    final baseUrl = dotenv.env['BASE_URL'];

    if (baseUrl == null) {
      return 'Erro: URL base não definida no ambiente.';
    }

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/decks/$idDecks/cards'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "front": front,
          "verse": verse,
        }),
      );

      if (response.statusCode == 200) {
        final responseJson = jsonDecode(response.body);
        return responseJson['message'] ?? 'Carta criada com sucesso';
      } else {
        final responseJson = jsonDecode(response.body);
        return 'Erro ao criar a carta: ${responseJson['error'] ?? response.statusCode}';
      }
    } catch (e) {
      return 'Ocorreu um erro ao criar a carta. Tente novamente!';
    }
  }
}

class DeckService {
  final int idDecks;
  final String name;

  const DeckService({
    required this.idDecks,
    required this.name,
  });

  Future<String> deleteDeck() async {
    final baseUrl = dotenv.env['BASE_URL'];

    if (baseUrl == null) {
      return 'Erro: URL base não definida no ambiente.';
    }

    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/decks/$idDecks'),
      );

      if (response.statusCode == 200) {
        final responseJson = jsonDecode(response.body);
        return responseJson['message'] ?? 'Deck deletado com sucesso';
      } else {
        final responseJson = jsonDecode(response.body);
        return 'Erro ao deletar o deck: ${responseJson['error'] ?? response.statusCode}';
      }
    } catch (e) {
      return 'Ocorreu um erro ao deletar o deck. Tente novamente!';
    }
  }

  Future<String> getDeck() async {
    final baseUrl = dotenv.env['BASE_URL'];

    if (baseUrl == null) {
      return 'Erro: URL base não definida no ambiente.';
    }

    try {
      final response = await http.get(
        Uri.parse('$baseUrl/decks/$idDecks'),
      );

      if (response.statusCode == 200) {
        final responseJson = jsonDecode(response.body);
        return jsonEncode(responseJson);
      } else {
        final responseJson = jsonDecode(response.body);
        return 'Erro ao encontrar o deck: ${responseJson['error'] ?? response.statusCode}';
      }
    } catch (e) {
      return 'Ocorreu um erro ao encontrar o deck. Tente novamente!';
    }
  }

  Future<String> newDeck() async {
    final baseUrl = dotenv.env['BASE_URL'];

    if (baseUrl == null) {
      return 'Erro: URL base não definida no ambiente.';
    }

    try {
      final response = await http.post(
        Uri.parse('$baseUrl/decks'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": name,
        }),
      );

      if (response.statusCode == 200) {
        final responseJson = jsonDecode(response.body);
        return responseJson['message'] ?? 'Deck criado com sucesso';
      } else {
        final responseJson = jsonDecode(response.body);
        return 'Erro ao criar o deck: ${responseJson['error'] ?? response.statusCode}';
      }
    } catch (e) {
      return 'Ocorreu um erro ao criar o deck. Tente novamente!';
    }
  }
}
