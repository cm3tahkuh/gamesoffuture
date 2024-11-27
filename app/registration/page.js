"use client";

import { useState } from "react";
import styles from "./registration.scss";

const RegistrationForm = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: "", role: "" });
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    groupNumber: "",
    captainTelegram: "",
  });

  const validatePlayer = () => {
    if (!newPlayer.name.trim()) {
      setError("Введите имя игрока.");
      return false;
    }
    if (players.length >= 3) {
      setError("Нельзя добавить более трёх игроков.");
      return false;
    }
    if (newPlayer.role === "капитан" && players.some((p) => p.role === "капитан")) {
      setError("Можно добавить только одного капитана.");
      return false;
    }

    if (newPlayer.role === "запасной" && players.some((p) => p.role === "запасной")) {
      setError("Можно добавить только одного запасного.");
      return false;
    }
    if (!newPlayer.role && players.some((p) => !p.role)) {
      setError("Можно добавить только одного обычного игрока.");
      return false;
    }
    setError("");
    return true;
  };

  const validateForm = () => {
    if (!formData.teamName.trim()) {
      setFormError("Введите название команды.");
      return false;
    }
    if (!formData.groupNumber.trim()) {
      setFormError("Введите номер группы.");
      return false;
    }
    if (!formData.captainTelegram.trim()) {
      setFormError("Введите Телеграм капитана команды.");
      return false;
    }
    if (players.length < 2) {
      setFormError("В команде должно быть минимум два игрока.");
      return false;
    }
    setFormError("");
    return true;
  };

  const addPlayer = () => {
    if (!validatePlayer()) return;
    setPlayers([...players, newPlayer]);
    setNewPlayer({ name: "", role: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Форма успешно отправлена!");

  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleRoleChange = (role) => {
    setNewPlayer((prev) => ({
      ...prev,
      role: prev.role === role ? "" : role,
    }));
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>РЕГИСТРАЦИЯ НА ТУРНИР</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название команды</label>
            <input
              type="text"
              placeholder="Название команды"
              value={formData.teamName}
              onChange={(e) =>
                setFormData({ ...formData, teamName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Номер группы</label>
            <input
              type="text"
              placeholder="Номер группы"
              value={formData.groupNumber}
              onChange={(e) =>
                setFormData({ ...formData, groupNumber: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Телеграм капитана команды</label>
            <input
              type="text"
              placeholder="https://telegram.org"
              value={formData.captainTelegram}
              onChange={(e) =>
                setFormData({ ...formData, captainTelegram: e.target.value })
              }
            />
          </div>
          <div className="player-list">
            {players.map((player, index) => (
              <div key={index} className="player-item">
                <span>{player.name}</span>
                <span>{player.role || "игрок"}</span>
                <button type="button" onClick={() => removePlayer(index)}>
                  🗑
                </button>
              </div>
            ))}
          </div>
          <div className="add-player">
            <span>Добавить игрока:</span>
            <div className="add-player-form">
              <input
                type="text"
                placeholder="ФИО"
                value={newPlayer.name}
                onChange={(e) =>
                  setNewPlayer({ ...newPlayer, name: e.target.value })
                }
              />
              <div className="role-selection">
                <label>
                  <input
                    type="checkbox"
                    checked={newPlayer.role === "капитан"}
                    onChange={() => handleRoleChange("капитан")}
                  />
                  Капитан
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={newPlayer.role === "запасной"}
                    onChange={() => handleRoleChange("запасной")}
                  />
                  Запасной
                </label>
              </div>
              <button type="button" onClick={addPlayer}>
                +
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {formError && <p className="form-error-message">{formError}</p>}
          <button type="submit">Отправить заявку</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
