import { useState } from "react";

function DeletarBatalha() {
    const [id, setId] = useState<string>('');
    const [mensagem, setMensagem] = useState<string>(''); 

    function digitarId(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }

    function deletarBatalha() {
        fetch(`http://localhost:5244/api/batalha/deletar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Batalha não encontrada.");
            }
        })
        .then(batalhaDeletada => {
            setMensagem(`Batalha com ID ${batalhaDeletada.batalhaId} deletada com sucesso!`);
            setId(''); 
        })
        .catch(error => {
            setMensagem(`Erro: ${error.message}`);
        });
    }

    return (
        <div>
            <h1>Deletar Batalha</h1>

            <label>ID da Batalha a ser deletada:</label>
            <input 
                type="text" 
                value={id}
                onChange={digitarId}
            />
            <button onClick={deletarBatalha}>Deletar</button>

            <p>{mensagem}</p>
        </div>
    );
}

export default DeletarBatalha;