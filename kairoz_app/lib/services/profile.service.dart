import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UserProfile {
  final String name;
  final String email;
  final String phone;

  UserProfile({
    required this.name,
    required this.email,
    required this.phone,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      name: json['name'] ?? 'Nome não disponível',
      email: json['email'] ?? 'E-mail não disponível',
      phone: json['phone'] ?? 'Telefone não disponível',
    );
  }
}

class ProfileService {
  Future<UserProfile> fetchUserProfile() async {
    final baseUrl = dotenv.env['BASE_URL'];
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String? token = prefs.getString('token');

    if (baseUrl == null) {
      throw Exception("BASE_URL não encontrada no arquivo .env");
    }

    try {
      final response = await http.get(
        Uri.parse('$baseUrl/profile'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = jsonDecode(response.body);
        return UserProfile.fromJson(responseData);
      } else {
        throw Exception('Falha ao carregar o perfil: ${response.statusCode}');
      }
    } catch (error) {
      throw Exception('Erro ao buscar o perfil: $error');
    }
  }

  bool validateProfile(UserProfile userProfile) {
    if (userProfile.name.isEmpty ||
        userProfile.email.isEmpty ||
        userProfile.phone.isEmpty) {
      return false;
    }
    return true;
  }
}
