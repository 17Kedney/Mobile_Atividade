import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// Lista de chuteiras
const chuteiras = [
  {
    id: 1,
    nome: 'Nike Mercurial Vapor (Campo)',
    preco: 'R$ 899,90',
    imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
  },
  {
    id: 2,
    nome: 'Adidas Predator (Campo)',
    preco: 'R$ 1.099,90',
    imagem: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400',
  },
  {
    id: 3,
    nome: 'Puma Future (Campo)',
    preco: 'R$ 799,90',
    imagem: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
  },
  {
    id: 4,
    nome: 'Nike Tiempo Futsal',
    preco: 'R$ 649,90',
    imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  },
  {
    id: 5,
    nome: 'Adidas Copa Futsal',
    preco: 'R$ 579,90',
    imagem: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
  },
  {
    id: 6,
    nome: 'Penalty Max Futsal',
    preco: 'R$ 349,90',
    imagem: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
  },
];

// ==================== TELA DE LOGIN ====================
function TelaLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha!');
      return;
    }
    Alert.alert('Sucesso!', 'Login realizado com sucesso!');
    onLogin();
  }

  return (
    <KeyboardAvoidingView 
      style={estilos.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={estilos.loginBox}>
        <Text style={estilos.loginTitulo}>Loja de Chuteiras</Text>
        <Text style={estilos.loginSubtitulo}>Faça login para continuar</Text>

        <TextInput
          style={estilos.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={estilos.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <TouchableOpacity style={estilos.botaoLogin} onPress={entrar}>
          <Text style={estilos.textoBotaoLogin}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ==================== CABEÇALHO ====================
function Cabecalho({ onSair }) {
  return (
    <View style={estilos.cabecalho}>
      <Text style={estilos.titulo}>Loja de Chuteiras</Text>
      <Text style={estilos.subtitulo}>Campo e Futsal</Text>

      <TouchableOpacity style={estilos.botaoSair} onPress={onSair}>
        <Text style={estilos.textoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

// ==================== ITEM DA LISTA ====================
function Item({ item, onPress }) {
  return (
    <TouchableOpacity style={estilos.item} onPress={() => onPress(item)}>
      <Image source={{ uri: item.imagem }} style={estilos.imagem} />
      
      <View style={estilos.info}>
        <Text style={estilos.nome}>{item.nome}</Text>
        <Text style={estilos.preco}>{item.preco}</Text>
        <Text style={estilos.clique}>Toque para comprar</Text>
      </View>
    </TouchableOpacity>
  );
}

// ==================== TELA DE COMPRA ====================
function TelaCompra({ produto, onVoltar }) {

  function pagar(forma) {
    Alert.alert(
      'Pagamento aprovado!',
      `Você comprou:\n${produto.nome}\n\nForma de pagamento: ${forma}\nValor: ${produto.preco}`
    );
  }

  return (
    <View style={estilos.container}>
      <StatusBar style="auto" />
      
      {/* Botão Voltar */}
      <TouchableOpacity style={estilos.botaoVoltar} onPress={onVoltar}>
        <Text style={estilos.textoVoltar}>← Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={estilos.compraContainer}>
        <Image source={{ uri: produto.imagem }} style={estilos.imagemGrande} />
        
        <Text style={estilos.nomeCompra}>{produto.nome}</Text>
        <Text style={estilos.precoCompra}>{produto.preco}</Text>

        <Text style={estilos.escolha}>Escolha a forma de pagamento:</Text>

        <TouchableOpacity style={estilos.botaoPagamento} onPress={() => pagar('Débito')}>
          <Text style={estilos.textoPagamento}>Débito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoPagamento} onPress={() => pagar('Crédito')}>
          <Text style={estilos.textoPagamento}>Crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoPagamento} onPress={() => pagar('PIX')}>
          <Text style={estilos.textoPagamento}>PIX</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ==================== LISTA ====================
function ListaChuteiras({ onSelecionar }) {
  return (
    <View style={estilos.lista}>
      <Text style={estilos.tituloLista}>Chuteiras disponíveis</Text>
      {chuteiras.map((item) => (
        <Item
          key={item.id}
          item={item}
          onPress={onSelecionar}
        />
      ))}
    </View>
  );
}

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [logado, setLogado] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  function sair() {
    setLogado(false);
    setProdutoSelecionado(null);
  }

  // Tela de Login
  if (!logado) {
    return <TelaLogin onLogin={() => setLogado(true)} />;
  }

  // Tela de Compra (quando clicou em uma chuteira)
  if (produtoSelecionado) {
    return (
      <TelaCompra 
        produto={produtoSelecionado} 
        onVoltar={() => setProdutoSelecionado(null)} 
      />
    );
  }

  // Tela Principal (Menu)
  return (
    <View style={estilos.container}>
      <StatusBar style="auto" />
      <Cabecalho onSair={sair} />
      <ScrollView>
        <ListaChuteiras onSelecionar={setProdutoSelecionado} />
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#1d3557',
    justifyContent: 'center',
    padding: 20,
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  loginTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1d3557',
    textAlign: 'center',
    marginBottom: 6,
  },
  loginSubtitulo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoLogin: {
    backgroundColor: '#e63946',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cabecalho: {
    backgroundColor: '#1d3557',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitulo: {
    fontSize: 14,
    color: '#a8dadc',
    marginTop: 6,
  },
  botaoSair: {
    marginTop: 12,
    backgroundColor: '#e63946',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  textoSair: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  lista: {
    padding: 16,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: 14,
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e63946',
    marginBottom: 4,
  },
  clique: {
    fontSize: 12,
    color: '#888',
  },
  // Tela de Compra
  botaoVoltar: {
    backgroundColor: '#1d3557',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  textoVoltar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  compraContainer: {
    padding: 20,
    alignItems: 'center',
  },
  imagemGrande: {
    width: 250,
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
  },
  nomeCompra: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d3557',
    textAlign: 'center',
    marginBottom: 8,
  },
  precoCompra: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e63946',
    marginBottom: 30,
  },
  escolha: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  botaoPagamento: {
    backgroundColor: '#e63946',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoPagamento: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});