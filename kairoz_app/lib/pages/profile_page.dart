import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kairoz/services/validation.service.dart';
import 'package:kairoz/widgets/drawer.dart';
import 'package:kairoz/services/profile.service.dart';
import 'package:kairoz/services/password.service.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Future<UserProfile> _userProfile;
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  bool _isEditingPhone = false;
  bool _isEditingName = false;
  bool _isEditingEmail = false;
  String _phoneNumber = "";
  String? _passwordError;

  final TextEditingController _oldPasswordController = TextEditingController();
  final TextEditingController _newPasswordController = TextEditingController();
  final TextEditingController _confirmNewPasswordController =
      TextEditingController();
  bool _isChangingPassword = false;

  @override
  void initState() {
    super.initState();
    _userProfile = ProfileService().fetchUserProfile();
  }

  void _savePhoneNumber() {
    final phoneNumber = _phoneController.text.trim();
    String? validationMessage =
        ValidationService.validatePhoneNumber(phoneNumber);

    if (validationMessage != null) {
      _showSnackbar(validationMessage);
      return;
    }

    setState(() {
      _phoneNumber = phoneNumber;
      _isEditingPhone = false;
    });
    _showSnackbar('Número de telefone salvo com sucesso!');
  }

  void _saveName() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      _showSnackbar('Por favor, insira um nome válido.');
    }
    if (!RegExp(r'^(?=.*[a-zA-Z])[0-9a-zA-Z]+$').hasMatch(name)) {
      _showSnackbar('O nome não pode possuir apenas números');
    } else {
      setState(() {
        _isEditingName = false;
      });
      _showSnackbar('Nome salvo com sucesso!');
    }
  }

  void _saveEmail() {
    final email = _emailController.text.trim();

    if (email.isEmpty) {
      _showSnackbar('Por favor, insira um e-mail válido.');
      return;
    }

    if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(email)) {
      _showSnackbar('Por favor, insira um e-mail válido.');
      return;
    }

    setState(() {
      _isEditingEmail = false;
    });
    _showSnackbar('E-mail salvo com sucesso!');
  }

  void _showSnackbar(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  TextInputFormatter _phoneNumberFormatter() {
    return TextInputFormatter.withFunction((oldValue, newValue) {
      if (newValue.text.isEmpty) {
        return newValue;
      }

      String number = newValue.text.replaceAll(RegExp(r'\D'), '');

      if (number.length > 11) {
        number = number.substring(0, 11);
      }

      if (number.length > 7) {
        number =
            '(${number.substring(0, 2)}) ${number.substring(2, 7)}-${number.substring(7)}';
      }

      return TextEditingValue(
          text: number,
          selection: TextSelection.collapsed(offset: number.length));
    });
  }

  void _changePassword() {
    final oldPassword = _oldPasswordController.text.trim();
    final newPassword = _newPasswordController.text.trim();
    final confirmNewPassword = _confirmNewPasswordController.text.trim();

    // Validação da senha
    String? validationMessage =
        PasswordService().validatePassword(newPassword, confirmNewPassword);

    setState(() {
      _passwordError = validationMessage; // Atualiza o erro
    });

    if (_passwordError != null) {
      return; // Se houver erro, não faz a mudança
    }

    PasswordService().changePassword(oldPassword, newPassword).then((success) {
      if (success) {
        _showSnackbar('Senha alterada com sucesso!');
        setState(() {
          _isChangingPassword = false;
        });
      } else {
        _showSnackbar('Falha ao alterar a senha.');
      }
    });
  }

  Widget _buildEditableField({
    required String label,
    required String currentValue,
    required TextEditingController controller,
    required bool isEditing,
    required VoidCallback saveFunction,
    required VoidCallback onEditPressed,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(fontSize: 16)),
        isEditing
            ? Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0),
                  child: TextField(
                    controller: controller,
                    decoration: InputDecoration(
                      labelText: 'Insira $label',
                      border: const OutlineInputBorder(),
                    ),
                    keyboardType: label == 'Telefone'
                        ? TextInputType.phone
                        : TextInputType.text,
                    inputFormatters:
                        label == 'Telefone' ? [_phoneNumberFormatter()] : [],
                    onEditingComplete: saveFunction,
                    textInputAction: TextInputAction.done,
                  ),
                ),
              )
            : Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(left: 10.0),
                  child: Text(
                    currentValue,
                    style: const TextStyle(fontSize: 14, color: Colors.black54),
                  ),
                ),
              ),
        IconButton(
          icon: const Icon(Icons.chevron_right,
              color: Color.fromARGB(255, 82, 22, 185)),
          onPressed: onEditPressed,
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffE4E1F3),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text('Perfil do Usuário',
            style: TextStyle(color: Colors.white)),
        backgroundColor: const Color.fromARGB(255, 82, 22, 185),
      ),
      drawer: MyDrawer(
        onHomeTap: () => Navigator.pushNamed(context, '/home'),
        onProfileTap: () => Navigator.pushNamed(context, '/profile'),
        onSignOut: () => Navigator.pushNamedAndRemoveUntil(
            context, '/login', ModalRoute.withName('/')),
      ),
      body: FutureBuilder<UserProfile>(
        future: _userProfile,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return const Center(child: Text('Erro ao carregar o perfil.'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('Nenhum dado disponível.'));
          } else {
            UserProfile user = snapshot.data!;

            return SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    const Text('Informações do Usuário',
                        style: TextStyle(fontSize: 20)),
                    const SizedBox(height: 20),
                    Container(
                      padding: const EdgeInsets.all(16.0),
                      decoration: BoxDecoration(
                        color: const Color(0xffE4E1F3),
                        borderRadius: BorderRadius.circular(15),
                        boxShadow: [
                          BoxShadow(
                              color: Colors.black.withOpacity(0.1),
                              blurRadius: 8,
                              offset: const Offset(0, 4)),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildEditableField(
                            label: 'Nome',
                            currentValue: user.name,
                            controller: _nameController,
                            isEditing: _isEditingName,
                            saveFunction: _saveName,
                            onEditPressed: () {
                              setState(() {
                                _isEditingName = true;
                                _nameController.text = user.name;
                              });
                            },
                          ),
                          const Divider(),
                          _buildEditableField(
                            label: 'E-mail',
                            currentValue: user.email,
                            controller: _emailController,
                            isEditing: _isEditingEmail,
                            saveFunction: _saveEmail,
                            onEditPressed: () {
                              setState(() {
                                _isEditingEmail = true;
                                _emailController.text = user.email;
                              });
                            },
                          ),
                          const Divider(),
                          _buildEditableField(
                            label: 'Telefone',
                            currentValue: _phoneNumber.isEmpty
                                ? 'Não definido'
                                : _phoneNumber,
                            controller: _phoneController,
                            isEditing: _isEditingPhone,
                            saveFunction: _savePhoneNumber,
                            onEditPressed: () {
                              setState(() {
                                _isEditingPhone = true;
                                _phoneController.text = _phoneNumber;
                              });
                            },
                          ),
                          const Divider(),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Text('Alterar Senha:',
                                  style: TextStyle(fontSize: 16)),
                              const SizedBox(width: 10),
                              IconButton(
                                icon: const Icon(Icons.chevron_right,
                                    color: Color.fromARGB(255, 82, 22, 185)),
                                onPressed: () {
                                  setState(() {
                                    _isChangingPassword = !_isChangingPassword;
                                  });
                                },
                              ),
                            ],
                          ),
                          if (_isChangingPassword)
                            Column(
                              children: [
                                TextField(
                                  controller: _oldPasswordController,
                                  obscureText: true,
                                  decoration: const InputDecoration(
                                      labelText: 'Senha Antiga',
                                      border: OutlineInputBorder()),
                                ),
                                const SizedBox(height: 10),
                                TextField(
                                  controller: _newPasswordController,
                                  obscureText: true,
                                  decoration: InputDecoration(
                                    labelText: 'Nova Senha',
                                    border: const OutlineInputBorder(),
                                    errorText: _passwordError,
                                  ),
                                  onChanged: (value) {
                                    setState(() {
                                      _passwordError = null;
                                    });
                                  },
                                  onEditingComplete: _changePassword,
                                ),
                                const SizedBox(height: 10),
                                TextField(
                                  controller: _confirmNewPasswordController,
                                  obscureText: true,
                                  decoration: InputDecoration(
                                    labelText: 'Confirmar Nova Senha',
                                    border: const OutlineInputBorder(),
                                    errorText: _passwordError,
                                  ),
                                  onChanged: (value) {
                                    setState(() {
                                      _passwordError = null;
                                    });
                                  },
                                  onEditingComplete: _changePassword,
                                ),
                                const SizedBox(height: 10),
                                ElevatedButton(
                                  onPressed: _changePassword,
                                  style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color.fromARGB(
                                          255, 82, 22, 185)),
                                  child: const Text('Alterar Senha',
                                      style: TextStyle(color: Colors.white)),
                                ),
                              ],
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
