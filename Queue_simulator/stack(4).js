class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element at the rear of the queue.
    enqueue(element) {
        this.items.push(element);
        return element;
    }

    // Remove and return the front element.
    dequeue() {
        if (this.isEmpty()) return undefined;
        return this.items.shift();
    }

    // Return the front element without removing it.
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    print() {
        return this.items.join(" ");
    }

    clear() {
        this.items = [];
    }
}

$(document).ready(function () {
    const queue = new Queue();
    const $queue = $("#queue");

    function showStatus(message) {
        $("#status").text(message);
    }

    function renderQueue() {
        $queue.empty();

        if (queue.isEmpty()) {
            $queue.append('<p class="text-white text-center mt-3">Queue is empty</p>');
            return;
        }

        queue.items.forEach(function (value, index) {
            const $item = $("<div>")
                .addClass("row push text-white " + (index % 2 === 0 ? "bg-primary" : "bg-success"))
                .text(value);

            if (index === 0) $item.attr("title", "Front of queue");
            if (index === queue.items.length - 1) $item.attr("data-position", "Rear");
            $queue.append($item);
        });
    }

    $("#enqueueBtn").on("click", function () {
        const value = $("#dataInput").val().trim();

        if (value === "") {
            showStatus("Please enter data before enqueueing.");
            $("#dataInput").trigger("focus");
            return;
        }

        queue.enqueue(value);
        $("#dataInput").val("");
        renderQueue();
        showStatus(value + " added to the rear of the queue.");
    });

    $("#dequeueBtn").on("click", function () {
        const removed = queue.dequeue();

        if (removed === undefined) {
            showStatus("Queue is empty. Nothing to dequeue.");
            return;
        }

        $("#deleted").text(removed);
        renderQueue();
        showStatus(removed + " removed from the front of the queue.");
    });

    $("#peekBtn").on("click", function () {
        const front = queue.peek();

        if (front === undefined) {
            showStatus("Queue is empty. Nothing to peek.");
            return;
        }

        renderQueue();
        $queue.children(".push").first().addClass("border border-warning border-3");
        showStatus("Front element is " + front + ". It was not removed.");
    });

    $("#clearBtn").on("click", function () {
        queue.clear();
        $("#deleted").empty();
        renderQueue();
        showStatus("Queue cleared.");
    });

    $("#dataInput").on("keydown", function (event) {
        if (event.key === "Enter") $("#enqueueBtn").trigger("click");
    });

    renderQueue();
});
