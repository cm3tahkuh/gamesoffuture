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
    selectedLocation: "",
    selectedSport: "",
  });

  const playerLimits = {
    баскетбол: { капитан: 1, игрок: 1, запасной: 1 },
    футбол: { капитан: 1, игрок: 4, запасной: 1 },
    хоккей: { капитан: 1, игрок: 5, запасной: 1 },
  };

  const validatePlayer = () => {
    if (!newPlayer.name.trim()) {
      setError("Введите имя игрока.");
      return false;
    }
    if (!formData.selectedSport) {
      setError("Выберите вид спорта.");
      return false;
    }

    const limits = playerLimits[formData.selectedSport];
    const roleCount = players.reduce(
      (acc, player) => {
        acc[player.role || "игрок"] += 1;
        return acc;
      },
      { капитан: 0, игрок: 0, запасной: 0 }
    );

    if (
      newPlayer.role === "капитан" &&
      roleCount["капитан"] >= limits["капитан"]
    ) {
      setError("Можно добавить только одного капитана.");
      return false;
    }

    if (
      newPlayer.role === "запасной" &&
      roleCount["запасной"] >= limits["запасной"]
    ) {
      setError("Можно добавить только одного запасного.");
      return false;
    }

    if (!newPlayer.role && roleCount["игрок"] >= limits["игрок"]) {
      setError(`Можно добавить только ${limits["игрок"]} обычных игроков.`);
      return false;
    }

    if (
      players.length >=
      limits["капитан"] + limits["игрок"] + limits["запасной"]
    ) {
      setError(
        `Максимальное количество игроков для ${formData.selectedSport} достигнуто.`
      );
      return false;
    }

    setError("");
    return true;
  };

  const validateForm = () => {
    if (!formData.selectedSport) {
      setFormError("Выберите вид спорта.");
      return false;
    }
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
    if (!/^@\S+$/.test(formData.captainTelegram)) {
      setFormError(
        "Некорректный Телеграм капитана. Убедитесь, что формат начинается с '@' и содержит текст."
      );
      return false;
    }
    if (!formData.selectedLocation) {
      setFormError("Выберите адрес.");
      return false;
    }
    const limits = playerLimits[formData.selectedSport];
    const roleCount = players.reduce(
      (acc, player) => {
        acc[player.role || "игрок"] += 1;
        return acc;
      },
      { капитан: 0, игрок: 0, запасной: 0 }
    );
    if (roleCount["капитан"] < limits["капитан"]) {
      setFormError("В команде должен быть один капитан.");
      return false;
    }
    if (roleCount["игрок"] < limits["игрок"]) {
      setFormError(`В команде должно быть минимум ${limits["игрок"]} игроков.`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/sendToTelegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, players }),
      });

      if (response.ok) {
        alert("Форма успешно отправлена!");
        setFormData({
          teamName: "",
          groupNumber: "",
          captainTelegram: "",
          selectedLocation: "",
          selectedSport: "",
        });
        setPlayers([]);
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.message}`);
      }
    } catch (error) {
      alert("Произошла ошибка при отправке данных.");
      console.error(error);
    }
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

  const handleSportChange = (newSport) => {
    const limits = playerLimits[newSport];
    const roleCount = players.reduce(
      (acc, player) => {
        acc[player.role || "игрок"] += 1;
        return acc;
      },
      { капитан: 0, игрок: 0, запасной: 0 }
    );
  
    if (
      roleCount["капитан"] > limits["капитан"] ||
      roleCount["игрок"] > limits["игрок"] ||
      roleCount["запасной"] > limits["запасной"]
    ) {
      alert("Количество игроков превышает лимит для выбранного вида спорта. Удалите лишних игроков, чтобы сменить вид спорта.");
      return; 
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedSport: newSport,
    }));
  };
  

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>РЕГИСТРАЦИЯ НА ТУРНИР</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="sport-selection">
              <div className="sport-label">
                <input
                  type="radio"
                  name="sport"
                  value="баскетбол"
                  checked={formData.selectedSport === "баскетбол"}
                  onChange={(e) => handleSportChange(e.target.value)}
                />
                <div>Баскетбол</div>
              </div>
              <div className="sport-label">
                <input
                  type="radio"
                  name="sport"
                  value="футбол"
                  checked={formData.selectedSport === "футбол"}
                  onChange={(e) => handleSportChange(e.target.value)}
                />
                <div>Футбол</div>
              </div>
              <div className="sport-label">
                <input
                  type="radio"
                  name="sport"
                  value="хоккей"
                  checked={formData.selectedSport === "хоккей"}
                  onChange={(e) => handleSportChange(e.target.value)}
                />
                <div>Хоккей</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Адрес</label>
            <select
              className="form-address"
              value={formData.selectedLocation}
              onChange={(e) =>
                setFormData({ ...formData, selectedLocation: e.target.value })
              }
            >
              <option value="Комсомольский проспект 113а">
                Комсомольский проспект 113а
              </option>
              <option value="Комсомольский проспект 113а ЮУТУ">
                Комсомольский проспект 113а ЮУТУ
              </option>
              <option value="Комаровского 9а">Комаровского 9а</option>
              <option value="Кожзаводская 1">Кожзаводская 1</option>
            </select>
          </div>
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
              placeholder="@telegramname"
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
