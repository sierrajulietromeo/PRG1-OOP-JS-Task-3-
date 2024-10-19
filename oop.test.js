const {
  PRIORITY,
  validInteger,
  validatePriority,
  Task,
  todaysDate,
  ToDo,
} = require("./oop.js");

describe("OOP function tests", () => {
  test("T01_validInteger_shouldHandleVariousInputs", () => {
    for (let i = 0; i < 21; i++) {
      expect(validInteger(i)).toBe(true);
      expect(validInteger(String(i))).toBe(true);
    }
    for (let i = -20; i < 0; i++) {
      expect(validInteger(i)).toBe(false);
      expect(validInteger(String(i))).toBe(false);
    }
    expect(validInteger(-0)).toBe(true);
    expect(validInteger(0.0)).toBe(true);
    expect(validInteger(1.0)).toBe(true);
    expect(validInteger(1.2)).toBe(false);
    expect(validInteger(-1.0)).toBe(false);
    const invalidInputs = ["-0", "A", "0A", "1.0", "A0", "", " ", "."];
    invalidInputs.forEach((input) => expect(validInteger(input)).toBe(false));
  });

  test("T02_validatePriority_shouldHandleValidAndInvalidPriorities", () => {
    const validPriorities = [1, 3, 5, 7];
    validPriorities.forEach((priority) => {
      expect(validatePriority(priority)).toBe(priority);
      expect(validatePriority(String(priority))).toBe(priority);
    });
    const invalidPriorities = [0, 2, 4, 6, 8, "A", "A0", "0A", ".", " "];
    invalidPriorities.forEach((priority) => {
      expect(validatePriority(priority)).toBe(1);
    });
  });

  test("T03_todaysDate_shouldReturnCurrentDateAndTimeInCorrectFormat", () => {
    let today = new Date();
    let date =
      today.getDate().toString().padStart(2, "0") +
      "/" +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      today.getFullYear();
    let time =
      today.getHours().toString().padStart(2, "0") +
      ":" +
      today.getMinutes().toString().padStart(2, "0") +
      ":" +
      today.getSeconds().toString().padStart(2, "0");
    let now = date + " " + time;
    expect(now).toBe(todaysDate());
  });

  test("T04_TaskConstructor_shouldInitialiseAttributesCorrectly", () => {
    let today = new Date();
    let date =
      today.getDate().toString().padStart(2, "0") +
      "/" +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      today.getFullYear();
    let time =
      today.getHours().toString().padStart(2, "0") +
      ":" +
      today.getMinutes().toString().padStart(2, "0") +
      ":" +
      today.getSeconds().toString().padStart(2, "0");
    let now = date + " " + time;
    const task = new Task("T1", PRIORITY["LOW"]);
    expect(task._added).toBe(now);
    expect(task._title).toBe("T1");
    expect(task._priority).toBe(PRIORITY["LOW"]);
  });

  test("T05_Task_shouldHaveReadOnlyAddedAndTitleProperties", () => {
    let x = new Task();
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), "added")
        .get
    ).toBe("function");
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), "added")
        .set
    ).toBe("undefined");

    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), "title")
        .get
    ).toBe("function");
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(x), "title")
        .set
    ).toBe("undefined");

    expect(
      typeof Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(x),
        "priority"
      ).get
    ).toBe("function");
    expect(
      typeof Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(x),
        "priority"
      ).set
    ).toBe("function");
  });

  test("T06_Task_shouldAllowSettingAndGettingPriorityWithValidation", () => {
    let task = new Task("T1", PRIORITY["LOW"]);
    expect(task.priority).toBe(PRIORITY["LOW"]);
    task.priority = PRIORITY["HIGH"];
    expect(task.priority).toBe(PRIORITY["HIGH"]);
    task.priority = 0;
    expect(task.priority).toBe(PRIORITY["LOW"]);
    task.priority = 10;
    expect(task.priority).toBe(PRIORITY["LOW"]);
  });

  test("T07_ToDo_shouldHaveAddRemoveListAndTaskMethods", () => {
    let y = new ToDo();
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), "add")
        .value
    ).toBe("function");
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), "remove")
        .value
    ).toBe("function");
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), "list")
        .value
    ).toBe("function");
    expect(
      typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(y), "task")
        .value
    ).toBe("function");
  });

  test("T08_ToDo_shouldAddRemoveAndListTasksCorrectly", () => {
    let tasks = new ToDo();
    expect(tasks.add(new Task("ACME T1", PRIORITY["LOW"]))).toBe(1);
    expect(tasks.add(new Task("ACME T2", PRIORITY["MEDIUM"]))).toBe(2);
    expect(tasks.add(new Task("ACME T3", PRIORITY["MEDIUM"]))).toBe(3);
    expect(tasks.add(new Task("ACME T4", PRIORITY["HIGH"]))).toBe(4);
    let a = tasks.list();
    expect(a.length).toBe(4);
    expect(a[0].length).toBe(3);
    expect(tasks.remove("ACME T5")).toBe(false);
    expect(tasks.remove("ACME T4")).toBe(true);
    a = tasks.list();
    expect(a.length).toBe(3);
    expect(tasks.list()[1][1]).toBe("ACME T2");
  });

  test("T09_ToDo_shouldProvideAccessToTasksAndAllowModification", () => {
    tasks = new ToDo();
    expect(tasks.add(new Task("ACME T1", PRIORITY["LOW"]))).toBe(1);
    expect(tasks.add(new Task("ACME T2", PRIORITY["MEDIUM"]))).toBe(2);
    expect(() => {
      let a = tasks.task("ACME T9");
    }).toThrow("Task 'ACME T9' Not Found");
    tasks.task("ACME T2").priority = PRIORITY["URGENT"];
    expect(tasks.task("ACME T2").priority).toBe(PRIORITY["URGENT"]);
  });
});
