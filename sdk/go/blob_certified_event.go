package main

import (
	"context"
	"fmt"
	"log"

	sui "github.com/MystenLabs/sui-go-sdk/client"
)

func main1() {
	// Initialize the SUI client
	client, err := sui.NewClient("https://fullnode.mainnet.sui.io:443")
	if err != nil {
		log.Fatalf("Failed to create SUI client: %v", err)
	}

	// Event filter for BlobCertified events
	filter := sui.EventFilter{
		MoveEvent: &sui.MoveEventFilter{
			Package: "0x7e12d67a52106ddd5f26c6ff4fe740ba5dea7cfc138d5b1d33863ba9098aa6fe",
			Module:  "blob_store",
			Event:   "BlobCertified",
		},
	}

	// Subscribe to events
	subscription, err := client.SubscribeEvents(context.Background(), filter, func(event *sui.EventEnvelope) {
		fmt.Println("BlobCertified Event:", event)
	})
	if err != nil {
		log.Fatalf("Failed to subscribe to events: %v", err)
	}
	defer subscription.Unsubscribe()

	fmt.Println("Listening for BlobCertified events...")

	// Block forever
	select {}
}
