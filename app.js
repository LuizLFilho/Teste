const firebaseConfig = {
  apiKey: "AIzaSyArguj7gqCRc92MptlNF1W3JLmdZJBb0A",
  authDomain: "testesbanco.firebaseapp.com",
  projectId: "testesbanco",
  storageBucket: "testesbanco.firebasestorage.app",
  messagingSenderId: "5042e2768682",
  appId: "1:504202768682:web:0198c63d28d82896216e53"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const inputNome = document.getElementById('inputNome');
const btnSalvar = document.getElementById('btnSalvar');
const btnRemover = document.getElementById('btnRemover');
const paragrafo = document.getElementById('paragrafo');

const docRef = db.collection("saudacoes").doc("mensagem-atual");


docRef.onSnapshot((doc) => {
    if (doc.exists) {
        const data = doc.data();
        paragrafo.textContent = `Olá, ${data.nome}! Este nome está guardado no servidor.`;
    } else {
        paragrafo.textContent = "Nenhum nome encontrado no servidor.";
    }
}, (error) => {
    console.error("Erro ao ouvir o documento: ", error);
    paragrafo.textContent = "Erro ao carregar os dados.";
});



btnSalvar.addEventListener('click', () => {
    const nomeDigitado = inputNome.value.trim();

    if (nomeDigitado) {
        docRef.set({
            nome: nomeDigitado,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        })
        .then(() => {
            console.log("Nome salvo com sucesso!");
            inputNome.value = '';
        })
        .catch((error) => {
            console.error("Erro ao salvar o nome: ", error);
            alert("Não foi possível salvar os dados. Verifique o console.");
        });
    } else {
        alert("Por favor, digite um nome.");
    }
});


btnRemover.addEventListener('click', () => {
    docRef.delete()
        .then(() => {
            console.log("Documento removido com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao remover o documento: ", error);
            alert("Não foi possível remover os dados. Verifique o console.");
        });
});