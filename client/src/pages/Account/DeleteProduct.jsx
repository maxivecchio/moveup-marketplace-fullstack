import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

export default function App({ handleDelete, product }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover
        backdrop="opaque"
        placement="bottom"
        offset={20}
        showArrow
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button color="danger">Delete</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Confirm Action</div>
            <div className="text-tiny">
              Are you sure you want to delete this product?
            </div>
            <Button
              onClick={() => {
                setIsOpen(false)
                handleDelete(product._id);
              }}
              className="mt-2"
              color="danger"
            >
              Yes, delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
